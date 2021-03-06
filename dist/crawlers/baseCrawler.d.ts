import winston from 'winston';
import { Db } from 'mongodb';
import { CrawlerStorage } from '../storage';
import { CrawlerRunOptions, ILink, CrawlerRequestOptions, ExtractDetailsOptions, ExtractLinksOptions } from '../models';
import Bluebird from 'bluebird';
export declare class BaseCrawler {
    storage: CrawlerStorage;
    private detailsCollection;
    private urlsCollection;
    join: typeof Bluebird.join;
    protected MIN_REST_TIME: number;
    protected MAX_RETRY_ATTEMPTS: number;
    protected logger: winston.Logger;
    protected BASE_URL: string;
    protected STORAGE_URL: string;
    protected STORAGE_DB: string;
    protected SOURCE: {
        name: string;
        url: string;
    };
    events: import("../events/base-crawler.events").BaseCrawlerEmitter;
    constructor(storage: CrawlerStorage, detailsCollection?: string, urlsCollection?: string);
    get source(): {
        name: string;
        url: string;
    };
    private defaultCrawlerOptions;
    private defaultCrawlerRequestOptions;
    runExtractLinks(options?: ExtractLinksOptions): Promise<ILink[]>;
    runExtractDetails(links: Array<any | ILink>, options?: ExtractDetailsOptions): Promise<number>;
    run(options?: CrawlerRunOptions): Promise<any>;
    protected makeRequest(url: string, options?: CrawlerRequestOptions): any;
    protected extractLinks(options?: any): Promise<string[] | any[]>;
    protected extractDetails(url: string | any, ...params: any[]): Promise<any[] | any | null>;
    protected formatLink(link: string, source: string): ILink;
    protected persistLinks(links: ILink[], db: Db): Promise<void>;
    protected persistDetails(details: any[] | any, db: Db): Promise<import("mongodb").InsertOneWriteOpResult<any> | import("mongodb").InsertWriteOpResult<any>>;
    protected getUnusedLinks(db: Db, filter?: any, detailed?: boolean): Promise<any[]>;
    protected useLink(db: Db, url: string): Promise<import("mongodb").FindAndModifyWriteOpResultObject<any>>;
    getDetails(queryFilter: any, db: Db, queryOptions?: any): Promise<import("mongodb").Cursor<any>>;
}
