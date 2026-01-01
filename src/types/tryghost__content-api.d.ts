declare module '@tryghost/content-api' {
  export interface GhostContentAPIOptions {
    url: string;
    key: string;
    version: string;
  }

  export interface BrowseOptions {
    limit?: number | 'all';
    page?: number;
    filter?: string;
    include?: string | string[];
    order?: string;
    fields?: string | string[];
  }

  export interface ReadOptions {
    include?: string | string[];
    fields?: string | string[];
  }

  export default class GhostContentAPI {
    constructor(options: GhostContentAPIOptions);
    
    posts: {
      browse(options?: BrowseOptions): Promise<any[]>;
      read(data: { id?: string; slug?: string }, options?: ReadOptions): Promise<any>;
    };
    
    tags: {
      browse(options?: BrowseOptions): Promise<any[]>;
      read(data: { id?: string; slug?: string }, options?: ReadOptions): Promise<any>;
    };
    
    authors: {
      browse(options?: BrowseOptions): Promise<any[]>;
      read(data: { id?: string; slug?: string }, options?: ReadOptions): Promise<any>;
    };
    
    pages: {
      browse(options?: BrowseOptions): Promise<any[]>;
      read(data: { id?: string; slug?: string }, options?: ReadOptions): Promise<any>;
    };
    
    settings: {
      browse(): Promise<any>;
    };
  }
}
