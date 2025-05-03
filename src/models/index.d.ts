import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";





type EagerVersesAppData = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<VersesAppData, 'id'>;
  };
  readonly id: string;
  readonly queryName: string;
  readonly versesGenerated: number;
  readonly createdAt: string;
  readonly updatedAt: string;
}

type LazyVersesAppData = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<VersesAppData, 'id'>;
  };
  readonly id: string;
  readonly queryName: string;
  readonly versesGenerated: number;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export declare type VersesAppData = LazyLoading extends LazyLoadingDisabled ? EagerVersesAppData : LazyVersesAppData

export declare const VersesAppData: (new (init: ModelInit<VersesAppData>) => VersesAppData) & {
  copyOf(source: VersesAppData, mutator: (draft: MutableModel<VersesAppData>) => MutableModel<VersesAppData> | void): VersesAppData;
}