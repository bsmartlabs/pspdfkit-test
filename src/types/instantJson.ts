import type { JsonObject } from 'type-fest';

// [left, top, width, height] as a number in px.
export type Rect = [number, number, number, number];

// [x, y] in px.
export type Point = [number, number];

// Counterclockwise angle in degrees. Should be 0, 90, 180, or 270.
export type Rotation = number;

// Inset used for drawing cloudy borders more precisely [left, top, right, bottom].
export type CloudyBorderInset = [number, number, number, number];

// "#RRGGBB"
export type Color = string;

// 0.0 to 1.0.
export type Opacity = number;

// 0.0 to 1.0; the default is 0.5.
export type Intensity = number;

// ISO 8601 with full date, time, and time zone information.
// e.g. "2012-04-23T18:25:43.511Z"
// - https://en.wikipedia.org/wiki/ISO_8601
// - https://www.w3.org/TR/NOTE-datetime
export type Timestamp = string;

export type Lines = {
  // Intensities are used to weigh the point during natural
  // drawing. They are received by pressure-sensitive drawing
  // or touch devices. The default value should be used if
  // it's not possible to obtain the intensity.
  intensities: Intensity[][];

  // Points are grouped in segments. Points inside a segment
  // are joined to a line. There must be at least one segment
  // with at least one point.
  points: Point[][];
};

export type LineCap =
  | 'square'
  | 'circle'
  | 'diamond'
  | 'openArrow'
  | 'closedArrow'
  | 'butt'
  | 'reverseOpenArrow'
  | 'reverseClosedArrow'
  | 'slash';

export type LineCaps = {
  start?: LineCap;
  end?: LineCap;
};

export type BlendMode =
  | 'normal'
  | 'multiply'
  | 'screen'
  | 'overlay'
  | 'darken'
  | 'lighten'
  | 'colorDodge'
  | 'colorBurn'
  | 'hardLight'
  | 'softLight'
  | 'difference'
  | 'exclusion';

export type BorderStyle =
  | 'solid'
  | 'dashed'
  | 'beveled'
  | 'inset'
  | 'underline';

export type BaseAction = {
  subAction?: Action;
};

export type GoToAction = BaseAction & {
  type: 'goTo';
  // The `pageIndex` you want to go to.
  pageIndex: number;
};

export type GoToRemoteAction = BaseAction & {
  type: 'goToRemote';
  relativePath: string;
  namedDestination: string;
};

export type GoToEmbeddedAction = BaseAction & {
  type: 'goToEmbedded';
  newWindow: boolean;
  relativePath: string;
  targetType: 'parent' | 'child';
};

export type LaunchAction = BaseAction & {
  type: 'launch';
  filePath: string;
};

export type URIAction = BaseAction & {
  type: 'uri';
  // URI, e.g.: `https://pspdfkit.com`
  uri: string;
};

export type AnnotationReference = {
  fieldName?: string;
  pdfObjectId?: number;
};

export type HideAction = BaseAction & {
  type: 'hide';
  hide: boolean;
  annotationReferences: AnnotationReference[];
};

export type JavaScriptAction = BaseAction & {
  type: 'javaScript';
  script: string;
};

export type SubmitFormFlags = Array<
  | 'includeExclude'
  | 'includeNoValueFields'
  | 'exportFormat'
  | 'getMethod'
  | 'submitCoordinated'
  | 'xfdf'
  | 'includeAppendSaves'
  | 'includeAnnotations'
  | 'submitPDF'
  | 'canonicalFormat'
  | 'excludeNonUserAnnotations'
  | 'excludeFKey'
  | 'embedForm'
>;

export type SubmitFormAction = BaseAction & {
  type: 'submitForm';
  uri: string;
  flags: SubmitFormFlags;
  fields?: AnnotationReference[];
};

export type ResetFormAction = BaseAction & {
  type: 'resetForm';
  flags?: 'includeExclude';
  fields?: AnnotationReference[];
};

export type NamedAction = BaseAction & {
  type: 'named';
  action:
    | 'nextPage'
    | 'prevPage'
    | 'firstPage'
    | 'lastPage'
    | 'goBack'
    | 'goForward'
    | 'goToPage'
    | 'find'
    | 'print'
    | 'outline'
    | 'search'
    | 'brightness'
    | 'zoomIn'
    | 'zoomOut'
    | 'saveAs'
    | 'info';
};

export type Action =
  | GoToAction
  | GoToRemoteAction
  | GoToEmbeddedAction
  | LaunchAction
  | URIAction
  | HideAction
  | JavaScriptAction
  | SubmitFormAction
  | ResetFormAction
  | NamedAction;

// See the PDF Reference for the below flags. One difference: Instead of a
// `print` flag, like in PDF, we have `noPrint` so that we don't have
// `print` enabled on almost all annotations.
export type Flags = Array<
  | 'noPrint'
  | 'noZoom'
  | 'noRotate'
  | 'noView'
  | 'hidden'
  | 'invisible'
  | 'readOnly'
  | 'locked'
  | 'toggleNoView'
  | 'lockedContents'
>;

export type AnnotationCustomData = JsonObject & {
  bookResource: boolean;
  resourceId: number;
  title: string;
};

export type BaseAnnotation = {
  // The spec version that the record is compliant to. Always `1`.
  v: 1;
  // An annotation must always be inside a specific page.
  pageIndex: number;
  // The bounding box of the annotation within the page.
  bbox: Rect;
  // Modifies the transparency of the annotation.
  opacity: Opacity;
  // The object ID from the source PDF.
  pdfObjectId?: number;
  // PDF Flags.
  flags?: Flags;
  // Optional PDF Action.
  action?: Action;
  // The name of the creator of the annotation.
  creatorName?: string;
  // The date of the annotation creation.
  createdAt: Timestamp;
  // The date of the last annotation update.
  updatedAt: Timestamp;
  // An identifier for the annotation that is unique within the document or Instant layer. When adding an annotation without an ID to PSPDFKit Server, an ID will be generated.
  id?: string;
  uuid?: string;
  // Optional annotation name. This is used to identify the annotation.
  name?: string;
  // Optional. If not specified, the blend mode is `normal`.
  blendMode?: BlendMode;
  // Custom attributes of the annotation.
  customData?: AnnotationCustomData;
};

export type MarkupAnnotation = BaseAnnotation & {
  type:
    | 'pspdfkit/markup/highlight'
    | 'pspdfkit/markup/squiggly'
    | 'pspdfkit/markup/strikeout'
    | 'pspdfkit/markup/underline';
  // List of rectangles on the page where the markup is drawn.
  rects: Array<Rect>;
  blendMode?: BlendMode;
  color: Color;
  note?: string;
};

export type RedactionAnnotation = MarkupAnnotation & {
  type: 'pspdfkit/markup/redaction';
  // Outline color is the border color of a redaction annotation when it hasn't yet been applied to the document.
  outlineColor?: Color;
  // Fill color is the background color that a redaction will have when applied to the document.
  fillColor?: Color;
  // The text that will be printed on top of an applied redaction annotation.
  overlayText?: string;
  // Specifies whether or not the `overlayText` will be repeated multiple times to fill the boundaries of the redaction annotation.
  repeatOverlayText?: boolean;
  rotation?: Rotation;
};

export type TextAnnotation = BaseAnnotation & {
  type: 'pspdfkit/text';
  // The text contents.
  text: string;
  // A background that will fill the bounding box.
  backgroundColor?: Color;
  // Size of the text in px (this will scale when you zoom in).
  fontSize: number;
  // The font to render the text. A client will fall back to a sans-serif font
  // if it isn't supported or if none is defined.
  font?: string;
  // A text can be only italic, only bold, italic and bold, or none of these.
  fontStyle?: Array<'italic' | 'bold'>;
  // The color of the rendered glyphs.
  fontColor: Color;
  horizontalAlign: 'left' | 'center' | 'right';
  verticalAlign: 'top' | 'center' | 'bottom';
  // Specifies that the text is supposed to fit in the bounding box.
  // This will only be set on new annotations, as we can't easily figure
  // out if an appearance stream contains all the text for existing annotations.
  isFitting?: boolean;
  callout?: {
    start: Point;
    knee?: Point;
    end: Point;
    cap?: LineCap;
    // Inset applied to the box to size and position the rectangle for the text [left, top, right, bottom].
    innerRectInset: [number, number, number, number];
  };
  borderStyle?: BorderStyle;
  // Only set if there is a `borderStyle` too.
  borderWidth?: number;
  rotation: Rotation;
  cloudyBorderIntensity?: number;
  cloudyBorderInset?: CloudyBorderInset;
};

export type InkAnnotation = BaseAnnotation & {
  type: 'pspdfkit/ink';
  // Refer to the above spec for the `Lines` type.
  lines: Lines;
  // The width of the line in px.
  lineWidth: number;
  // PSPDFKit's natural drawing mode. This value is only used by PSPDFKit
  // for iOS.
  isDrawnNaturally: boolean;
  // `true` if the annotation is an ink signature.
  isSignature?: boolean;
  // The color of the line.
  strokeColor: Color;
  // The color that fills the bounding box.
  backgroundColor?: Color;
  blendMode?: BlendMode;
  note?: string;
};

export type LinkAnnotation = BaseAnnotation & {
  type: 'pspdfkit/link';
  // Refer to the spec for the `Action` type.
  action: Action;
  note?: string;
  borderStyle?: BorderStyle;
  // Only set if there is a `borderStyle` too.
  borderWidth?: number;
  // The common annotations dictionary says that the C entry should be used for
  // border color in the case of link annotations.
  borderColor?: Color;
};

export type NoteAnnotation = BaseAnnotation & {
  type: 'pspdfkit/note';
  text: string;
  icon:
    | 'comment'
    | 'rightPointer'
    | 'rightArrow'
    | 'check'
    | 'circle'
    | 'cross'
    | 'insert'
    | 'newParagraph'
    | 'note'
    | 'paragraph'
    | 'help'
    | 'star'
    | 'key';
  // Fills the note shape and its icon [canvas].
  color: Color;
};

export type ShapeAnnotation = BaseAnnotation & {
  strokeDashArray?: number[];
  strokeWidth: number;
  strokeColor: Color;
  note?: string;
};

export type EllipseAnnotation = ShapeAnnotation & {
  type: 'pspdfkit/shape/ellipse';
  // Fills the inside of the shape.
  fillColor?: Color;
  cloudyBorderIntensity?: number;
  cloudyBorderInset?: CloudyBorderInset;
};

export type RectangleAnnotation = ShapeAnnotation & {
  type: 'pspdfkit/shape/rectangle';
  // Fills the inside of the shape.
  fillColor?: Color;
  cloudyBorderIntensity?: number;
  cloudyBorderInset?: CloudyBorderInset;
};

export type LineAnnotation = ShapeAnnotation & {
  type: 'pspdfkit/shape/line';
  startPoint: Point;
  endPoint: Point;
  lineCaps?: LineCaps;
  // Fills the inside of the end/start caps.
  fillColor?: Color;
};

export type PolylineAnnotation = ShapeAnnotation & {
  type: 'pspdfkit/shape/polyline';
  // Fills the inside of the line caps.
  fillColor?: Color;
  lineCaps?: LineCaps;
  points: Point[];
};

export type PolygonAnnotation = ShapeAnnotation & {
  type: 'pspdfkit/shape/polygon';
  // Fills the inside of a closed polygon.
  fillColor?: Color;
  points: Point[];
  cloudyBorderIntensity?: number;
};

export type ImageAnnotation = BaseAnnotation & {
  type: 'pspdfkit/image';
  // A description of the image, e.g. "PSPDFKit Logo."
  description?: string;
  // Only if one can be retrieved.
  fileName?: string;
  contentType?: 'image/jpeg' | 'image/png' | 'application/pdf';
  // Either the SHA-256 hash of the attachment or the `pdfObjectId` of the attachment.
  imageAttachmentId?: string;
  rotation: Rotation;
  note?: string;
};

export type StampAnnotation = BaseAnnotation & {
  type: 'pspdfkit/stamp';
  stampType:
    | 'Accepted'
    | 'Approved'
    | 'AsIs'
    | 'Completed'
    | 'Confidential'
    | 'Departmental'
    | 'Draft'
    | 'Experimental'
    | 'Expired'
    | 'Final'
    | 'ForComment'
    | 'ForPublicRelease'
    | 'InformationOnly'
    | 'InitialHere'
    | 'NotApproved'
    | 'NotForPublicRelease'
    | 'PreliminaryResults'
    | 'Rejected'
    | 'Revised'
    | 'SignHere'
    | 'Sold'
    | 'TopSecret'
    | 'Void'
    | 'Witness'
    // Not a standard stamp. Displays arbitrary text in the title and subtitle.
    | 'Custom';
  title?: string;
  subtitle?: string;
  color?: Color;
  rotation: Rotation;
  note?: string;
};

export type CommentMarkerAnnotation = BaseAnnotation & {
  type: 'pspdfkit/comment-marker';
  // The comment text.
  text: string;
  // The name of the comment author.
  creatorName?: string;
  // The date of the comment creation.
  createdAt?: Timestamp;
  // The date of the last comment update.
  updatedAt?: Timestamp;
  note?: string;
};

export type Annotation =
  | MarkupAnnotation
  | TextAnnotation
  | NoteAnnotation
  | EllipseAnnotation
  | RectangleAnnotation
  | LineAnnotation
  | PolylineAnnotation
  | InkAnnotation
  | LinkAnnotation
  | ShapeAnnotation
  | ImageAnnotation
  | StampAnnotation
  | CommentMarkerAnnotation;
