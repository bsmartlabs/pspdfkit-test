import type { Book } from '@bsmartlabs/sdk';
import type { NativeSyntheticEvent, NativeTouchEvent, ViewProps } from 'react-native';
import type { JsonObject } from 'type-fest';

import type { Annotation } from './instantJson';
import type { ResourceWithLink } from './resource';

export type Dimensions = {
  width: number;
  height: number;
};

export type ViewMode = 'document' | 'thumbnails' | 'documentEditor';

export type AnnotationType =
  | 'Link'
  | 'Highlight'
  | 'Underline'
  | 'Squiggly'
  | 'StrikeOut'
  | 'Text'
  | 'Caret'
  | 'FreeText'
  | 'Ink'
  | 'Square'
  | 'Circle'
  | 'Line'
  | 'Signature'
  | 'Stamp'
  | 'Eraser'
  | 'Image'
  | 'Widget'
  | 'FileAttachment'
  | 'Sound'
  | 'Polygon'
  | 'PolyLine'
  | 'RichMedia'
  | 'Screen'
  | 'Popup'
  | 'Watermark'
  | 'TrapNet'
  | '3D'
  | 'Redact';

export type PDFAnnotationChangedEvent = NativeSyntheticEvent<
  | {
      change: 'removed';
      annotations: Pick<Annotation, 'name' | 'creatorName' | 'uuid'>[];
    }
  | {
      change: 'added' | 'changed';
      annotations: Annotation[];
    }
>;

export type PDFAnnotationTappedEvent = NativeSyntheticEvent<Annotation>;

export type PDFDataReturnedEvent = NativeSyntheticEvent<{
  requestId: number;
  result?:
    | boolean
    | string
    | JsonObject
    | {
        annotations: Annotation[];
      };
  error?: string;
}>;

export type PDFDocumentLoadFailedEvent = NativeSyntheticEvent<{
  error: string;
}>;

export type PDFDocumentSavedEvent = NativeSyntheticEvent<Record<string, never>>;

export type PDFDocumentSaveFailedEvent = NativeSyntheticEvent<{
  error: string;
}>;

export type PDFNavigationButtonClickedEvent = NativeSyntheticEvent<Record<string, never>>;

export type PDFStateChangedEvent = NativeSyntheticEvent<{
  documentLoaded: boolean;
  currentPageIndex: number;
  pageCount: number;
  annotationCreationActive: boolean;
  affectedPageIndex: number;
  annotationEditingActive: boolean;
  textSelectionActive: boolean;
  formEditingActive: boolean;
}>;

export type PDFMenuButtonPressedEvent = NativeSyntheticEvent<
  | { type: 'sidebar' }
  | {
      type: 'avatar';
      buttonDimensions: Dimensions;
      navigationBarDimesions: Dimensions;
    }
>;

export type PDFThumbnailsChangedEvent = NativeSyntheticEvent<{
  indexes: number[];
}>;

export interface PDFConfiguration {
  // ---------------- DOCUMENT INTERACTION OPTIONS ----------------

  /**
   * 	Configures the direction of page scrolling in the document view.
   */
  scrollDirection: 'horizontal' | 'vertical';
  /**
   * Configures the page scrolling mode. Note that curl mode is only available
   * for iOS and will be ignored on Android.
   */
  pageTransition: 'scrollPerSpread' | 'scrollContinuous' | 'curl';
  /**
   * Allow / disallow text selection.
   */
  enableTextSelection: boolean;
  /**
   * Determines whether PSPDFKit should save automatically in response to
   * [certain UI triggers](https://pspdfkit.com/guides/react-native/save-a-document/#auto-save),
   * such as the app entering the background or the view disappearing.
   */
  autosaveEnabled: boolean;
  /**
   * Determines whether PSPDFKit should save automatically in response to
   * [certain UI triggers](https://pspdfkit.com/guides/react-native/save-a-document/#auto-save),
   * such as the app entering the background or the view disappearing.
   */
  disableAutomaticSaving: boolean;
  /**
   * Determines whether signatures should be saved after creation.
   */
  signatureSavingStrategy: 'alwaysSave' | 'neverSave' | 'saveIfSelected';
  /**
   * Scrolls to the affected page during an undo / redo operation.
   */
  iOSShouldScrollToChangedPage: boolean;
  /**
   * Sets the scroll view inset adjustment mode.
   */
  iOSScrollViewInsetAdjustment: 'none' | 'fixedElements' | 'allElements';
  /**
   * Option to automatically focus on selected form elements.
   */
  iOSFormElementZoomEnabled: boolean;
  /**
   * Allow / disallow image selection.
   */
  iOSImageSelectionEnabled: boolean;
  /**
   * Configure if text selection should snap to words.
   */
  iOSTextSelectionShouldSnapToWord: boolean;
  /**
   * Shows a toolbar with text editing options above the keyboard while editing free text annotations.
   */
  iOSFreeTextAccessoryViewEnabled: boolean;
  /**
   * Enable / disable all internal gesture recognizers.
   */
  iOSInternalTapGesturesEnabled: boolean;
  /**
   * Determines whether automatic saving should happen on a background thread.
   */
  iOSAllowBackgroundSaving: boolean;
  /**
   * Minimum zoom scale for the scroll view.
   */
  iOSMinimumZoomScale: number;
  /**
   * Maximum zoom scale for the scroll view.
   */
  iOSMaximumZoomScale: number;
  /**
   * The action that happens when the user double taps somewhere in the document.
   */
  iOSDoubleTapAction: 'none' | 'zoom' | 'smartZoom';
  /**
   * Defines how the text is selected.
   */
  iOSTextSelectionMode: 'regular' | 'simple';
  /**
   * Shows a custom cell with configurable color presets for the provided annotation types.
   */
  iOSTypesShowingColorPresets: ((AnnotationType & 'none') | 'undefined' | 'all')[];

  // ---------------- DOCUMENT PRESENTATION OPTIONS ----------------

  /**
   * Configure the page mode.
   */
  pageMode: 'single' | 'double' | 'automatic';
  /**
   * Option to show the first page separately.
   */
  firstPageAlwaysSingle: boolean;
  /**
   * Displays the current page number.
   */
  showPageLabels: boolean;
  /**
   * Shows an overlay displaying the document name.
   */
  documentLabelEnabled: boolean;
  /**
   * Controls the page fitting mode.
   * `adaptive` mode only works on iOS and has no effect on Android.
   */
  spreadFitting: 'fit' | 'fill' | 'adaptive';
  /**
   * Inverts the document color if `true`.
   */
  invertColors: boolean;
  /**
   * Converts the document colors to grayscale.
   */
  androidGrayScale: boolean;
  /**
   * Option to clip content to page boundaries.
   */
  iOSClipToPageBoundaries: boolean;
  /**
   * Background color behind the page view.
   */
  iOSBackgroundColor: string;
  /**
   * Shows a `UIActivityIndicatorView` in the top-right corner while the page is rendering.
   */
  iOSRenderAnimationEnabled: boolean;
  /**
   * Position of the render status view.
   */
  iOSRenderStatusViewPosition: 'top' | 'centered';
  /**
   * Allowed appearance modes for `BrightnessViewController`.
   */
  iOSAllowedAppearanceModes: 'default' | 'sepia' | 'night' | 'all';

  // ---------------- USER INTERFACE OPTIONS ----------------

  /**
   * Configures the user interface visibility.
   */
  userInterfaceViewMode:
    | 'automatic'
    | 'automaticBorderPages'
    | 'automaticNoFirstLastPage'
    | 'always'
    | 'alwaysVisible'
    | 'alwaysHidden'
    | 'never';
  /**
   * Sets the type of search bar to be inline or modular.
   */
  inlineSearch: boolean;
  /**
   * Hides the user interface if set to `true`.
   */
  immersiveMode: boolean;
  /**
   * Sets the title of the toolbar.
   * Note: For iOS, you need to set `documentLabelEnabled`,
   * `iOSUseParentNavigationBar`, and `iOSAllowToolbarTitleChange` to false
   * in your configuration before setting the custom title.
   */
  toolbarTitle: string;
  /**
   * Enables / disables document search functionality.
   */
  androidShowSearchAction: boolean;
  /**
   * Enables an outline menu in the activity.
   */
  androidShowOutlineAction: boolean;
  /**
   * Enables the display of bookmarks.
   */
  androidShowBookmarksAction: boolean;
  /**
   * Enables the display of share features.
   */
  androidShowShareAction: boolean;
  /**
   * Enables the printing option in the menu (if applicable) for the document and the device.
   */
  androidShowPrintAction: boolean;
  /**
   * Enables the display of document information.
   */
  androidShowDocumentInfoView: boolean;
  /**
   * Enables the display of the settings menu.
   */
  androidShowSettingsMenu: boolean;
  /**
   * Option to hide / show the user interface when changing pages.
   */
  iOSShouldHideUserInterfaceOnPageChange: boolean;
  /**
   * Option to hide / show the user interface when the page appears.
   */
  iOSShouldShowUserInterfaceOnViewWillAppear: boolean;
  /**
   * Option to hide / show the status bar with the user interface.
   */
  iOSShouldHideStatusBarWithUserInterface: boolean;
  /**
   * Option to hide / show the navigation bar with the user interface.
   */
  iOSShouldHideNavigationBarWithUserInterface: boolean;
  /**
   * Sets the type of search bar to be inline or modal.
   */
  iOSSearchMode: 'modal' | 'inline';
  /**
   * Determines whether tapping on leading / trailing edges of the document view
   * should trigger changing to the previous / next page.
   */
  iOSScrollOnEdgeTapEnabled: boolean;
  /**
   * The margin in points from the view’s sides in which tapping should trigger
   * scrolling to the previous / next page.
   */
  iOSScrollOnEdgeTapMargin: number;
  /**
   * Set this to `true` to allow this controller to access the parent
   * `navigationBar` / `navigationController` to add custom buttons.
   */
  iOSUseParentNavigationBar: boolean;
  /**
   * Allow PSPDFKit to change the title of this view controller.
   */
  iOSAllowToolbarTitleChange: boolean;
  /**
   * If `true`, the status bar will always remain hidden
   * (regardless of the `shouldHideStatusBarWithUserInterface` setting).
   */
  iOSShouldHideStatusBar: boolean;
  /**
   * Shows a floating back button in the lower part of the screen.
   */
  iOSShowBackActionButton: boolean;
  /**
   * Shows a floating forward button in the lower part of the screen.
   */
  iOSShowForwardActionButton: boolean;
  /**
   * Adds text labels representing the destination name to the back and forward buttons.
   */
  iOSShowBackForwardActionButtonLabels: boolean;
  /**
   * Increase this to zoom to the search result.
   */
  iOSSearchResultZoomScale: number;
  /**
   * Additional insets to apply to the document scroll view’s frame.
   */
  // TODO: iOSAdditionalScrollViewFrameInsets
  /**
   * Additional insets to apply to the layout’s content.
   */
  // TODO: iOSAdditionalContentInsets
  /**
   * May be used to customize other displayed menu actions when text is selected.
   */
  iOSAllowedMenuActions: 'none' | 'search' | 'define' | 'wikipedia' | 'speak' | 'all';
  /**
   * Options that will be presented by `PDFSettingsViewController`. Defaults to `default`.
   */
  iOSSettingsOptions:
    | 'scrollDirection'
    | 'pageTransition'
    | 'appearance'
    | 'brightness'
    | 'pageMode'
    | 'spreadFitting'
    | 'default'
    | 'all';
  /**
   * Enable / disable page shadow.
   */
  iOSShadowEnabled: boolean;
  /**
   * Set the default `shadowOpacity`.
   */
  iOSShadowOpacity: number;

  // ---------------- THUMBNAIL OPTIONS ----------------

  /**
   * Thumbnail bar mode controls the display of page thumbnails viewing a document.
   */
  showThumbnailBar: 'none' | 'default' | 'floating' | 'pinned' | 'scrubberBar' | 'scrollable';
  /**
   * Displays an action bar icon to show a grid of thumbnail pages.
   */
  androidShowThumbnailGridAction: boolean;
  /**
   * Controls the placement of the scrubber bar.
   */
  iOSScrubberBarType: 'horizontal' | 'verticalLeft' | 'verticalRight';
  /**
   * Option to set the grouping of thumbnails.
   */
  iOSThumbnailGrouping: 'automatic' | 'never' | 'always';

  // ---------------- ANNOTATION, FORMS, AND BOOKMARK OPTIONS ----------------

  /**
   * Set containing the annotation types that should be editable.
   */
  editableAnnotationTypes: ((AnnotationType & 'none') | 'undefined' | 'all')[];
  /**
   * Configuration to enable / disable editing all annotations.
   * To selectively enable editing for specific types of annotations, use `editableAnnotationTypes`.
   */
  enableAnnotationEditing: boolean;
  /**
   * Configuration to enable / disable editing forms.
   * This can also be accomplished by adding / removing the Widget
   * annotation type from `editableAnnotationTypes`.
   */
  enableFormEditing: boolean;
  /**
   * Enables the list of annotations.
   */
  androidShowAnnotationListAction: boolean;
  /**
   * If `true`, asks the user to specify a custom annotation user name ("author") when creating a new annotation.
   */
  iOSShouldAskForAnnotationUsername: boolean;
  /**
   * Sets the default link action for pressing on `LinkAnnotation`s.
   */
  iOSLinkAction: 'none' | 'alertView' | 'openSafari' | 'inlineBrowser' | 'InlineWebViewController';
  /**
   * Determines whether new annotations are created when strokes end.
   */
  iOSDrawCreateMode: 'separate' | 'mergeIfPossible';
  /**
   * If set to `true`, you can group / ungroup annotations with the multi-select tool.
   */
  iOSAnnotationGroupingEnabled: boolean;
  /**
   * Enables natural drawing for ink annotations.
   */
  iOSNaturalDrawingAnnotationEnabled: boolean;
  /**
   * Enables natural drawing for signatures.
   */
  iOSNaturalSignatureDrawingEnabled: boolean;
  /**
   * Controls if a second tap to an annotation that allows inline editing enters edit mode.
   */
  iOSAnnotationEntersEditModeAfterSecondTapEnabled: boolean;
  /**
   * If set to true, a long tap that ends on a page area that isn’t a text / image
   * will show a new menu to create annotations.
   */
  iOSCreateAnnotationMenuEnabled: boolean;
  /**
   * Overlay annotations are faded in. Set the global duration for this fade here.
   */
  iOSAnnotationAnimationDuration: number;
  /**
   * Describes the time limit for recording sound annotations, in seconds.
   */
  iOSSoundAnnotationTimeLimit: number;
  /**
   * Controls how bookmarks are displayed and managed.
   */
  iOSBookmarkSortOrder: 'custom' | 'pageBased';
}

export interface PDFDocumentProps {
  uri: string;
  password?: string;
}

export interface PDFViewProps extends ViewProps {
  book?: Book;
  avatar?: string;
  /**
   * Path to the PDF file that should be displayed.
   */
  document?: PDFDocumentProps;
  /**
   * Configuration object, to customize the appearance and behavior of PSPDFKit.
   * See https://pspdfkit.com/guides/react-native/user-interface/configuration/ for more information.
   *
   * Note: On iOS, set `useParentNavigationBar` to `true`, to use the parent navigation bar instead of creating its own,
   * if the view is already contained in a navigation controller (like when using NavigatorIOS, react-native-navigation, ...).
   */
  configuration?: Partial<PDFConfiguration>;
  /**
   * Page index of the document that will be shown.
   */
  pageIndex?: number;
  /**
   * Controls wheter a navigation bar is created and shown or not. Defaults to showing a navigation bar (false).
   *
   * @platform ios
   */
  hideNavigationBar?: boolean;
  /**
   * Whether the close button should be shown in the navigation bar. Disabled by default.
   * Will call `onCloseButtonPressed` if it was provided, when tapped.
   * If `onCloseButtonPressed` was not provided, PSPDFView will be automatically dismissed.
   *
   * @platform ios
   */
  showCloseButton?: boolean;
  /**
   * Controls wheter or not the default action for tapped annotations is processed. Defaults to processing the action (false).
   */
  disableDefaultActionForTappedAnnotations?: boolean;
  /**
   * Controls whether or not the document will be automatically saved. Defaults to automatically saving (false).
   */
  disableAutomaticSaving?: boolean;
  /**
   * Controls the author name that is set for new annotations.
   * If not set and the user hasn't specified it before the user will be asked and the result will be saved.
   * The value set here will be persisted and the user will not be asked even if this is not set the next time.
   */
  annotationAuthorName?: string;
  /**
   * Callback that is called when the user tapped the close button.
   * If you provide this function, you need to handle dismissal yourself.
   * If you don't provide this function, PSPDFView will be automatically dismissed.
   *
   * @platform ios
   */
  onCloseButtonPressed?: (event: NativeSyntheticEvent<NativeTouchEvent>) => void;
  /**
   * Callback that is called when the document is saved.
   */
  onDocumentSaved?: (event: PDFDocumentSavedEvent) => void;
  /**
   * Callback that is called when the document fails to save.
   * Returns a string error with the error message.
   * {
   *    error: "Error message",
   * }
   */
  onDocumentSaveFailed?: (event: PDFDocumentSaveFailedEvent) => void;
  /**
   * Callback that is called when an annotation is added, changed, or removed.
   * Returns an object with the following structure:
   * {
   *    change: "changed"|"added"|"removed",
   *    annotations: [instantJson]
   * }
   */
  onAnnotationTapped?: (event: PDFAnnotationTappedEvent) => void;
  /**
   * Callback that is called when an annotation is added, changed, or removed.
   * Returns an object with the following structure:
   * {
   *    change: "changed"|"added"|"removed",
   *    annotations: [instantJson]
   * }
   */
  onAnnotationsChanged?: (event: PDFAnnotationChangedEvent) => void;
  /**
   * Callback that is called when the state of the PSPDFView changes.
   * Returns an object with the following structure:
   * {
   *    documentLoaded: bool,
   *    currentPageIndex: int,
   *    pageCount: int,
   *    annotationCreationActive: bool,
   *    annotationEditingActive: bool,
   *    textSelectionActive: bool,
   *    formEditingActive: bool,
   * }
   *
   */
  onStateChanged?: (event: PDFStateChangedEvent) => void;
  /**
   * Callback that is called when the menu button is clicked.
   */
  onMenuButtonPressed?: (event: PDFMenuButtonPressedEvent) => void;

  onThumbnailsChanged?(event: PDFThumbnailsChangedEvent): void;
  /**
   * fragmentTag: A tag used to identify a single PdfFragment in the view hierarchy.
   * This needs to be unique in the view hierarchy.
   *
   * @platform android
   */
  fragmentTag?: string;
  /**
   * menuItemGrouping: Can be used to specfiy a custom grouping for the menu items in the annotation creation toolbar.
   */
  menuItemGrouping?: Array<string | { key: string; items: string[] }>;
  /**
   * leftBarButtonItems: Can be used to specfiy an array of the left button items.
   * Note: The same button item cannot be added to both the left and right bar button items simultaneously.
   * The full list of button items: https://pspdfkit.com/api/ios/Classes/PSPDFViewController.html#/Toolbar%20button%20items
   *
   * @platform ios
   */
  leftBarButtonItems?: string[];
  /**
   * rightBarButtonItems: Can be used to specfiy an array of the right button items.
   * Note: The same button item cannot be added to both the left and right bar button items simultaneously.
   * The full list of button items: https://pspdfkit.com/api/ios/Classes/PSPDFViewController.html#/Toolbar%20button%20items
   *
   * @platform ios
   */
  rightBarButtonItems?: string[];
  /**
   * toolbarTitle: Can be used to specfiy a custom toolbar title on iOS by setting the `title` property of the `PSPDFViewController`.
   * Note: You need to set `showDocumentLabel`, `useParentNavigationBar`, and `allowToolbarTitleChange` to false in your Configuration before setting the custom title.
   * See `ConfiguredPDFViewComponent` in https://github.com/PSPDFKit/react-native/blob/master/samples/Catalog/Catalog.ios.js
   *
   * @platform ios
   */
  toolbarTitle?: string;
  /**
   * showNavigationButtonInToolbar: When set to true the toolbar integrated into the PSPDFView will display a back button in the top left corner.
   *
   * @platform android
   */
  showNavigationButtonInToolbar?: boolean;
  /**
   * onNavigationButtonClicked: When showNavigationButtonInToolbar is set to true this will notify you when the back button is clicked.
   *
   * @platform android
   */
  onNavigationButtonClicked?: (event: PDFNavigationButtonClickedEvent) => void;
  /**
   * availableFontNames: Can be used to specfiy the available font names in the font picker.
   *
   * Note on iOS: You need to set the desired font family names as `UIFontDescriptor`. See https://developer.apple.com/documentation/uikit/uifontdescriptor?language=objc
   * See `CustomFontPicker` in https://github.com/PSPDFKit/react-native/blob/master/samples/Catalog/Catalog.ios.js
   *
   */
  availableFontNames?: string[];
  /**
   * selectedFontName: Can be used to specfiy the current selected font in the font picker.
   *
   * Note on iOS: You need to set the desired font family name as `UIFontDescriptor`. See https://developer.apple.com/documentation/uikit/uifontdescriptor?language=objc
   * See `CustomFontPicker` in https://github.com/PSPDFKit/react-native/blob/master/samples/Catalog/Catalog.ios.js
   *
   * Note on Android: This is the default font that is selected, if the users changes the font that will become the new default.
   */
  selectedFontName?: string;
  /**
   * showDownloadableFonts: Can be used to show or hide the downloadable fonts section in the font picker. Defaults to showing a the downloadable fonts (true).
   * See `CustomFontPicker` in https://github.com/PSPDFKit/react-native/blob/master/samples/Catalog/Catalog.ios.js
   *
   * @platform ios
   */
  showDownloadableFonts?: boolean;
}

export interface PdfViewRef {
  enterAnnotationCreationMode(): void;
  exitCurrentlyActiveMode(): void;
  saveCurrentDocument(): Promise<boolean>;
  getAnnotations(pageIndex: number, type?: AnnotationType): Promise<{ annotations: Annotation[] }>;
  addAnnotation(annotation: Annotation): Promise<boolean>;
  removeAnnotation(annotation: Annotation): Promise<boolean>;
  getAllUnsavedAnnotations(): Promise<{ annotations: Annotation[] }>;
  getAllAnnotations(type?: AnnotationType): Promise<{ annotations: Annotation[] }>;
  addAnnotations(annotations: Annotation[]): Promise<boolean>;
  setLeftBarButtonItems(items?: string[], viewMode?: ViewMode, animated?: boolean): void;
  getLeftBarButtonItemsForViewMode(viewMode?: ViewMode): Promise<string[] | { error: string }>;
  setRightBarButtonItems(items?: string[], viewMode?: ViewMode, animated?: boolean): void;
  getRightBarButtonItemsForViewMode(viewMode?: ViewMode): Promise<string[] | { error: string }>;
  addResourceIcons(resources: Array<ResourceWithLink[]>): Promise<boolean>;
  getPageSize(index: number): Promise<{ width: number; height: number }>;
}

export interface ReactPdfViewManagerType {
  enterAnnotationCreationMode(reactTag: number): void;
  exitCurrentlyActiveMode(reactTag: number): void;
  saveCurrentDocument(reactTag: number): Promise<boolean>;
  getAnnotations(
    pageIndex: number,
    type: AnnotationType | null,
    reactTag: number,
  ): Promise<{ annotations: Annotation[] }>;
  addAnnotation(annotation: Annotation, reactTag: number): Promise<boolean>;
  removeAnnotation(annotation: Annotation, reactTag: number): Promise<boolean>;
  getAllUnsavedAnnotations(reactTag: number): Promise<{ annotations: Annotation[] }>;
  getAllAnnotations(
    type: AnnotationType | null,
    reactTag: number,
  ): Promise<{ annotations: Annotation[] }>;
  addAnnotations(annotations: Annotation[], reactTag: number): Promise<boolean>;
  setLeftBarButtonItems(
    items: string[] | null,
    viewMode: ViewMode | null,
    animated: boolean,
    reactTag: number,
  ): void;
  getLeftBarButtonItemsForViewMode(viewMode?: ViewMode): Promise<string[] | { error: string }>;
  setRightBarButtonItems(
    items: string[] | null,
    viewMode: ViewMode | null,
    animated: boolean,
    reactTag: number,
  ): void;
  getRightBarButtonItemsForViewMode(viewMode?: ViewMode): Promise<string[] | { error: string }>;
  addResourceIcons(resources: Array<ResourceWithLink[]>): Promise<boolean>;
  getPageSize(index: number): Promise<{ width: number; height: number }>;
  getPageThumbnail(pageIndex: number): Promise<{ image: string } | { error: string }>;
  getThumbnails(pageIndexes: number[]): Promise<{ [index: number]: string } | { error: string }>;
}

export interface PSPDFKitModule {
  setLicenseKeys: (androidKey: string, iosKey: string) => void;
}

export type DispatchViewManagerCommandFunction = <
  T extends keyof PdfViewRef =
    | 'enterAnnotationCreationMode'
    | 'exitCurrentlyActiveMode'
    | 'setLeftBarButtonItems'
    | 'setRightBarButtonItems',
>(
  command: keyof Pick<ReactPdfViewManagerType, T>,
  ...params: Parameters<PdfViewRef[T]>
) => void;

export type DispatchAsyncViewManagerCommandFunction = <
  T extends keyof PdfViewRef =
    | 'saveCurrentDocument'
    | 'getAnnotations'
    | 'addAnnotation'
    | 'removeAnnotation'
    | 'getAllUnsavedAnnotations'
    | 'getAllAnnotations'
    | 'addAnnotations'
    | 'addResourceIcons'
    | 'getPageSize'
    | 'getLeftBarButtonItemsForViewMode'
    | 'getRightBarButtonItemsForViewMode',
>(
  command: keyof Pick<ReactPdfViewManagerType, T>,
  ...params: Parameters<PdfViewRef[T]>
) => ReturnType<ReactPdfViewManagerType[T]>;
