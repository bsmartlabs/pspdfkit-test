import type { JsonObject } from 'type-fest';

export interface Asset {
  id: number;
  filename: string;
  use?: string;
  compression?: string;
  md5: string;
  size: number;
  url: string;
  mimetype?: string;
  encrypted?: boolean;
  deleted?: boolean;
  uploaded_at?: string;
}

export interface Role {
  id: number;
  name: string;
}

export interface ResourceImage {
  thumb?: string;
  big?: string;
}

export interface Link {
  id: string;
  order?: number;
  user_id: number;
  book_id?: number;
  resource_id: string;
  target_id?: string;
  resource_type_id?: number;
  target_type_id?: number;
  details?: JsonObject;
  updated_at: number;
}

export interface Resource {
  id: string;
  learning_type_id?: number;
  resource_code: string;
  resource_type_id: number;
  title?: string;
  user_id: number;
  assets: Asset[];
  origin: string;
  description?: string;
  content?: string;
  value?: number;
  deleted?: boolean;
  invisible?: boolean;
  roles: Role[];
  image?: ResourceImage;
  updated_at: number;
  downloaded_at?: Date;
  book_id?: number;
}

export interface ResourceWithLink extends Resource {
  link: Link;
  iconName?: string;
}
