/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const generateAQuote = /* GraphQL */ `query GenerateAQuote($input: AWSJSON!) {
  generateAQuote(input: $input)
}
` as GeneratedQuery<
  APITypes.GenerateAQuoteQueryVariables,
  APITypes.GenerateAQuoteQuery
>;
export const getVersesAppData = /* GraphQL */ `query GetVersesAppData($id: ID!) {
  getVersesAppData(id: $id) {
    id
    queryName
    versesGenerated
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetVersesAppDataQueryVariables,
  APITypes.GetVersesAppDataQuery
>;
export const listVersesAppData = /* GraphQL */ `query ListVersesAppData(
  $filter: ModelVersesAppDataFilterInput
  $limit: Int
  $nextToken: String
) {
  listVersesAppData(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      queryName
      versesGenerated
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListVersesAppDataQueryVariables,
  APITypes.ListVersesAppDataQuery
>;
export const syncVersesAppData = /* GraphQL */ `query SyncVersesAppData(
  $filter: ModelVersesAppDataFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncVersesAppData(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
    items {
      id
      queryName
      versesGenerated
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SyncVersesAppDataQueryVariables,
  APITypes.SyncVersesAppDataQuery
>;
export const verseQueryName = /* GraphQL */ `query VerseQueryName(
  $queryName: String!
  $sortDirection: ModelSortDirection
  $filter: ModelVersesAppDataFilterInput
  $limit: Int
  $nextToken: String
) {
  verseQueryName(
    queryName: $queryName
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      queryName
      versesGenerated
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.VerseQueryNameQueryVariables,
  APITypes.VerseQueryNameQuery
>;
