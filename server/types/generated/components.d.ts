import type { Schema, Struct } from '@strapi/strapi';

export interface VideoFeature extends Struct.ComponentSchema {
  collectionName: 'components_video_features';
  info: {
    displayName: 'feature';
    icon: 'check';
  };
  attributes: {
    icon: Schema.Attribute.Enumeration<['check']>;
  };
}

export interface VideoVideoFeature extends Struct.ComponentSchema {
  collectionName: 'components_video_video_features';
  info: {
    displayName: 'video-feature';
    icon: 'check';
  };
  attributes: {
    icon_class: Schema.Attribute.String;
    text: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'video.feature': VideoFeature;
      'video.video-feature': VideoVideoFeature;
    }
  }
}
