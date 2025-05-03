/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createVersesAppData = /* GraphQL */ `mutation CreateVersesAppData(
  $input: CreateVersesAppDataInput!
  $condition: ModelVersesAppDataConditionInput
) {
  createVersesAppData(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateVersesAppDataMutationVariables,
  APITypes.CreateVersesAppDataMutation
>;
export const updateVersesAppData = /* GraphQL */ `mutation UpdateVersesAppData(
  $input: UpdateVersesAppDataInput!
  $condition: ModelVersesAppDataConditionInput
) {
  updateVersesAppData(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateVersesAppDataMutationVariables,
  APITypes.UpdateVersesAppDataMutation
>;
export const deleteVersesAppData = /* GraphQL */ `mutation DeleteVersesAppData(
  $input: DeleteVersesAppDataInput!
  $condition: ModelVersesAppDataConditionInput
) {
  deleteVersesAppData(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteVersesAppDataMutationVariables,
  APITypes.DeleteVersesAppDataMutation
>;
