/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as EditTickerImport } from './routes/edit-ticker'
import { Route as IndexImport } from './routes/index'
import { Route as TickerDetailsIndexImport } from './routes/ticker-details/index'
import { Route as TickerDetailsDetailIdImport } from './routes/ticker-details/$detailId'

// Create/Update Routes

const EditTickerRoute = EditTickerImport.update({
  id: '/edit-ticker',
  path: '/edit-ticker',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const TickerDetailsIndexRoute = TickerDetailsIndexImport.update({
  id: '/ticker-details/',
  path: '/ticker-details/',
  getParentRoute: () => rootRoute,
} as any)

const TickerDetailsDetailIdRoute = TickerDetailsDetailIdImport.update({
  id: '/ticker-details/$detailId',
  path: '/ticker-details/$detailId',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/edit-ticker': {
      id: '/edit-ticker'
      path: '/edit-ticker'
      fullPath: '/edit-ticker'
      preLoaderRoute: typeof EditTickerImport
      parentRoute: typeof rootRoute
    }
    '/ticker-details/$detailId': {
      id: '/ticker-details/$detailId'
      path: '/ticker-details/$detailId'
      fullPath: '/ticker-details/$detailId'
      preLoaderRoute: typeof TickerDetailsDetailIdImport
      parentRoute: typeof rootRoute
    }
    '/ticker-details/': {
      id: '/ticker-details/'
      path: '/ticker-details'
      fullPath: '/ticker-details'
      preLoaderRoute: typeof TickerDetailsIndexImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/edit-ticker': typeof EditTickerRoute
  '/ticker-details/$detailId': typeof TickerDetailsDetailIdRoute
  '/ticker-details': typeof TickerDetailsIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/edit-ticker': typeof EditTickerRoute
  '/ticker-details/$detailId': typeof TickerDetailsDetailIdRoute
  '/ticker-details': typeof TickerDetailsIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/edit-ticker': typeof EditTickerRoute
  '/ticker-details/$detailId': typeof TickerDetailsDetailIdRoute
  '/ticker-details/': typeof TickerDetailsIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/edit-ticker'
    | '/ticker-details/$detailId'
    | '/ticker-details'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/edit-ticker' | '/ticker-details/$detailId' | '/ticker-details'
  id:
    | '__root__'
    | '/'
    | '/edit-ticker'
    | '/ticker-details/$detailId'
    | '/ticker-details/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  EditTickerRoute: typeof EditTickerRoute
  TickerDetailsDetailIdRoute: typeof TickerDetailsDetailIdRoute
  TickerDetailsIndexRoute: typeof TickerDetailsIndexRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  EditTickerRoute: EditTickerRoute,
  TickerDetailsDetailIdRoute: TickerDetailsDetailIdRoute,
  TickerDetailsIndexRoute: TickerDetailsIndexRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/edit-ticker",
        "/ticker-details/$detailId",
        "/ticker-details/"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/edit-ticker": {
      "filePath": "edit-ticker.tsx"
    },
    "/ticker-details/$detailId": {
      "filePath": "ticker-details/$detailId.tsx"
    },
    "/ticker-details/": {
      "filePath": "ticker-details/index.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
