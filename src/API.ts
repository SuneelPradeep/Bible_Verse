/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateVersesAppDataInput = {
  id?: string | null,
  queryName: string,
  versesGenerated: number,
  createdAt?: string | null,
  updatedAt?: string | null,
  _version?: number | null,
};

export type ModelVersesAppDataConditionInput = {
  queryName?: ModelStringInput | null,
  versesGenerated?: ModelIntInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelVersesAppDataConditionInput | null > | null,
  or?: Array< ModelVersesAppDataConditionInput | null > | null,
  not?: ModelVersesAppDataConditionInput | null,
  _deleted?: ModelBooleanInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type ModelBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type VersesAppData = {
  __typename: "VersesAppData",
  id: string,
  queryName: string,
  versesGenerated: number,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
};

export type UpdateVersesAppDataInput = {
  id: string,
  queryName?: string | null,
  versesGenerated?: number | null,
  createdAt?: string | null,
  updatedAt?: string | null,
  _version?: number | null,
};

export type DeleteVersesAppDataInput = {
  id: string,
  _version?: number | null,
};

export type ModelVersesAppDataFilterInput = {
  id?: ModelIDInput | null,
  queryName?: ModelStringInput | null,
  versesGenerated?: ModelIntInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelVersesAppDataFilterInput | null > | null,
  or?: Array< ModelVersesAppDataFilterInput | null > | null,
  not?: ModelVersesAppDataFilterInput | null,
  _deleted?: ModelBooleanInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelVersesAppDataConnection = {
  __typename: "ModelVersesAppDataConnection",
  items:  Array<VersesAppData | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelSubscriptionVersesAppDataFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  queryName?: ModelSubscriptionStringInput | null,
  versesGenerated?: ModelSubscriptionIntInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionVersesAppDataFilterInput | null > | null,
  or?: Array< ModelSubscriptionVersesAppDataFilterInput | null > | null,
  _deleted?: ModelBooleanInput | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  in?: Array< number | null > | null,
  notIn?: Array< number | null > | null,
};

export type CreateVersesAppDataMutationVariables = {
  input: CreateVersesAppDataInput,
  condition?: ModelVersesAppDataConditionInput | null,
};

export type CreateVersesAppDataMutation = {
  createVersesAppData?:  {
    __typename: "VersesAppData",
    id: string,
    queryName: string,
    versesGenerated: number,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type UpdateVersesAppDataMutationVariables = {
  input: UpdateVersesAppDataInput,
  condition?: ModelVersesAppDataConditionInput | null,
};

export type UpdateVersesAppDataMutation = {
  updateVersesAppData?:  {
    __typename: "VersesAppData",
    id: string,
    queryName: string,
    versesGenerated: number,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type DeleteVersesAppDataMutationVariables = {
  input: DeleteVersesAppDataInput,
  condition?: ModelVersesAppDataConditionInput | null,
};

export type DeleteVersesAppDataMutation = {
  deleteVersesAppData?:  {
    __typename: "VersesAppData",
    id: string,
    queryName: string,
    versesGenerated: number,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type GenerateAQuoteQueryVariables = {
  input: string,
};

export type GenerateAQuoteQuery = {
  generateAQuote?: string | null,
};

export type GetVersesAppDataQueryVariables = {
  id: string,
};

export type GetVersesAppDataQuery = {
  getVersesAppData?:  {
    __typename: "VersesAppData",
    id: string,
    queryName: string,
    versesGenerated: number,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type ListVersesAppDataQueryVariables = {
  filter?: ModelVersesAppDataFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListVersesAppDataQuery = {
  listVersesAppData?:  {
    __typename: "ModelVersesAppDataConnection",
    items:  Array< {
      __typename: "VersesAppData",
      id: string,
      queryName: string,
      versesGenerated: number,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncVersesAppDataQueryVariables = {
  filter?: ModelVersesAppDataFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncVersesAppDataQuery = {
  syncVersesAppData?:  {
    __typename: "ModelVersesAppDataConnection",
    items:  Array< {
      __typename: "VersesAppData",
      id: string,
      queryName: string,
      versesGenerated: number,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type VerseQueryNameQueryVariables = {
  queryName: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelVersesAppDataFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type VerseQueryNameQuery = {
  verseQueryName?:  {
    __typename: "ModelVersesAppDataConnection",
    items:  Array< {
      __typename: "VersesAppData",
      id: string,
      queryName: string,
      versesGenerated: number,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type OnCreateVersesAppDataSubscriptionVariables = {
  filter?: ModelSubscriptionVersesAppDataFilterInput | null,
};

export type OnCreateVersesAppDataSubscription = {
  onCreateVersesAppData?:  {
    __typename: "VersesAppData",
    id: string,
    queryName: string,
    versesGenerated: number,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnUpdateVersesAppDataSubscriptionVariables = {
  filter?: ModelSubscriptionVersesAppDataFilterInput | null,
};

export type OnUpdateVersesAppDataSubscription = {
  onUpdateVersesAppData?:  {
    __typename: "VersesAppData",
    id: string,
    queryName: string,
    versesGenerated: number,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnDeleteVersesAppDataSubscriptionVariables = {
  filter?: ModelSubscriptionVersesAppDataFilterInput | null,
};

export type OnDeleteVersesAppDataSubscription = {
  onDeleteVersesAppData?:  {
    __typename: "VersesAppData",
    id: string,
    queryName: string,
    versesGenerated: number,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};
