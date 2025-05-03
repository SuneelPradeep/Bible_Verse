/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateVersesAppData = /* GraphQL */ `subscription OnCreateVersesAppData(
  $filter: ModelSubscriptionVersesAppDataFilterInput
) {
  onCreateVersesAppData(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateVersesAppDataSubscriptionVariables,
  APITypes.OnCreateVersesAppDataSubscription
>;
export const onUpdateVersesAppData = /* GraphQL */ `subscription OnUpdateVersesAppData(
  $filter: ModelSubscriptionVersesAppDataFilterInput
) {
  onUpdateVersesAppData(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateVersesAppDataSubscriptionVariables,
  APITypes.OnUpdateVersesAppDataSubscription
>;
export const onDeleteVersesAppData = /* GraphQL */ `subscription OnDeleteVersesAppData(
  $filter: ModelSubscriptionVersesAppDataFilterInput
) {
  onDeleteVersesAppData(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteVersesAppDataSubscriptionVariables,
  APITypes.OnDeleteVersesAppDataSubscription
>;
