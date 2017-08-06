import {Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GlobalValidators} from "../../../../shared/globalValidators";
import {Comment} from "../../../../interfaces/comment.interface";
import {Recipe} from "../../../../interfaces/recipe.interface";
import {RecipesService} from "../../../../services/recipes.service";
import {UtilsService} from "../../../../services/utils.service";
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';

@Component({
  selector: 'pec-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentItemComponent implements OnInit {

  @Input() comments: Comment[];
  @Input() type: string;
  @Output() onGetParentId = new EventEmitter<Object>();

  constructor() { }

  ngOnInit() {
  }

  getParentId(id: string, authorName: string) {
    this.onGetParentId.emit({id, authorName});
  }

}

@Component({
  selector: 'pec-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  @Input() comments: Comment[];
  @Input() recipeId: number;
  @Input() commentsNb: number;

  @ViewChild('authorInput') authorInput: ElementRef;
  @ViewChild('commentBox') commentBox: ElementRef;

  parentId: number = null;
  authorName: string= null;
  commentForm: FormGroup;
  commentDisabled: boolean = true;
  isBrowser: boolean;

  constructor(private utilsService: UtilsService,
              private formBuilder: FormBuilder,
              private recipesService: RecipesService,
              @Inject(DOCUMENT) private _document: any,
              @Inject(PLATFORM_ID) private platformId: Object) {
  }

  ngOnInit(): void {
    this.buildForm();
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  /**
   * Assign id and authorName values when child response comment button is clicked
   * @param object
   */
  onGetParentId(object: {id, authorName}): void {
    this.parentId = object.id;
    this.authorName = object.authorName;
    this.scrollToCommentBox();
    this.authorInput.nativeElement.focus();
  }

  scrollToCommentBox(): void {
    const commentBoxPosition: number = this.commentBox.nativeElement.offsetTop;
    const offset = 200;

    if (isPlatformBrowser(this.platformId)) {
      window.scroll({
        top: commentBoxPosition + offset,
        left: 0,
        behavior: 'smooth'
      });
    }

  }

  removeResponseValues(): void {
    this.parentId = null;
    this.authorName = null;
  }

  /**
   * Get the commentForm with validators
   */
  buildForm(): void {
    this.commentForm = this.formBuilder.group({
      author: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(24)
      ]],
      authorEmail: ['', [
        Validators.required,
        GlobalValidators.mailFormat
      ]],
      authorUrl: ['', [
        GlobalValidators.urlFormat
      ]],
      content: ['', [
        Validators.required
      ]],
      notifications: [true]
    });

    // On form changes, call to the function onValueChanged
    this.commentForm.valueChanges
      .subscribe(data => this.onValueChanged());

  }

  /**
   * When the values change, we change the formErrors state
   */
  onValueChanged(): void {
    if (!this.commentForm) { return; }

    const form = this.commentForm;

    for (const field in this.formErrors) {
      const control = form.get(field);
      if (control && !control.dirty) {
        this.formErrors[field] = 'default';
      } else if (control && control.dirty && !control.valid) {
        this.formErrors[field] = 'warning';
      } else if (control && control.dirty && control.valid) {
        this.formErrors[field] = 'success';
      }
    }

    this.commentDisabled = !this.commentForm.valid;
  }

  /**
   * FormErrors with strings
   */
  formErrors = {
    'author': 'default',
    'authorEmail': 'default',
    'authorUrl': 'default',
    'content': 'default'
  };

  /**
   * Add a new comment
   */
  addComment(): void {
    this.utilsService.snackBar('pending', 'Envoi en cours...');

    this.commentDisabled = true;
    const formValues = this.commentForm.value;

    // Comment object with form values
    const newComment: Comment = {
      author: formValues.author,
      author_email: formValues.authorEmail,
      author_url: formValues.authorUrl ? formValues.authorUrl : null,
      notifications: formValues.notifications,
      content: formValues.content,
      recipe: this.recipeId,
      parent: this.parentId,
    };
    // Call to the addComment API
    this.recipesService.addComment(newComment)
      .subscribe(
        () => {
          this.utilsService.snackBar('success', 'Ton message va être approuvé !');
          this.commentForm.reset();
          this.commentForm.get('notifications').setValue(true);
        },
        err => this.utilsService.snackBar('error', 'Une erreur est survenue.')
      );
  }

}
