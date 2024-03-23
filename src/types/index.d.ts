declare interface CreateUserParams {
  clerkId: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  photo: string;
};

declare interface UpdateUserParams {
  firstName: string;
  lastName: string;
  username: string;
  photo: string;
};

declare interface AddImageParams {
  image: {
    title: string;
    publicId: string;
    transformationType: string;
    width: number;
    height: number;
    config: any;
    secureUrl: string;
    transformationURL: string;
    aspectRatio: string | undefined;
    prompt: string | undefined;
    color: string | undefined;
  };
  userId: string;
  path: string;
};

declare interface UpdateImageParams {
  image: {
    _id: string;
    title: string;
    publicId: string;
    transformationType: string;
    width: number;
    height: number;
    config: any;
    secureUrl: string;
    transformationURL: string;
    aspectRatio: string | undefined;
    prompt: string | undefined;
    color: string | undefined;
  };
  userId: string;
  path: string;
};

declare interface Transformations {
  restore?: boolean;
  fillBackground?: boolean;
  remove?: {
    prompt: string;
    removeShadow?: boolean;
    multiple?: boolean;
  };
  recolor?: {
    prompt?: string;
    to: string;
    multiple?: boolean;
  };
  removeBackground?: boolean;
};

declare interface CheckoutTransactionParams {
  plan: string;
  credits: number;
  amount: number;
  buyerId: string;
};

declare interface CreateTransactionParams {
  stripeId: string;
  amount: number;
  credits: number;
  plan: string;
  buyerId: string;
  createdAt: Date;
};

declare type TransformationTypeKey = 'restore' | 'fill' | 'remove' | 'recolor' | 'removeBackground';

declare interface FormUrlQueryParams {
  searchParams: string;
  key: string;
  value: string | number | null;
};

declare interface UrlQueryParams {
  params: string;
  key: string;
  value: string | null;
};

declare interface RemoveUrlQueryParams {
  searchParams: string;
  keysToRemove: string[];
};

declare interface SearchParamProps {
  params: { id: string; type: TransformationTypeKey };
  searchParams: { [key: string]: string | string[] | undefined };
};

declare interface TransformationFormProps {
  action: 'Add' | 'Update';
  userId: string;
  type: TransformationTypeKey;
  creditBalance: number;
  data?: IImage | null;
  config?: Transformations | null;
};

declare interface TransformedImageProps {
  image: any;
  type: string;
  title: string;
  transformationConfig: Transformations | null;
  isTransforming: boolean;
  hasDownload?: boolean;
  setIsTransforming?: React.Dispatch<React.SetStateAction<boolean>>;
};
