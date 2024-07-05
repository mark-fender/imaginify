export enum TransformationType {
  RESTORE = 'restore',
  FILL = 'fill',
  REMOVE = 'remove',
  RECOLOR = 'recolor',
  REMOVE_BACKGROUND = 'removeBackground',
}

export enum ActionType {
  ADD = 'Add',
  UPDATE = 'Update',
}

export const navLinks = [
  {
    label: 'Home',
    route: '/',
    icon: '/assets/icons/home.svg',
  },
  {
    label: 'Image Restore',
    route: '/transformations/add/restore',
    icon: '/assets/icons/image.svg',
  },
  {
    label: 'Generative Fill',
    route: '/transformations/add/fill',
    icon: '/assets/icons/stars.svg',
  },
  {
    label: 'Object Remove',
    route: '/transformations/add/remove',
    icon: '/assets/icons/scan.svg',
  },
  {
    label: 'Object Recolor',
    route: '/transformations/add/recolor',
    icon: '/assets/icons/filter.svg',
  },
  {
    label: 'Background Remove',
    route: '/transformations/add/removeBackground',
    icon: '/assets/icons/camera.svg',
  },
  {
    label: 'Profile',
    route: '/profile',
    icon: '/assets/icons/profile.svg',
  },
  {
    label: 'Buy Credits',
    route: '/credits',
    icon: '/assets/icons/bag.svg',
  },
] as const;

export const plans = [
  {
    _id: 1,
    name: 'Free',
    icon: '/assets/icons/free-plan.svg',
    price: 0,
    credits: 20,
    inclusions: [
      {
        label: '20 Free Credits',
        isIncluded: true,
      },
      {
        label: 'Basic Access to Services',
        isIncluded: true,
      },
      {
        label: 'Priority Customer Support',
        isIncluded: false,
      },
      {
        label: 'Priority Updates',
        isIncluded: false,
      },
    ],
  },
  {
    _id: 2,
    name: 'Pro Package',
    icon: '/assets/icons/free-plan.svg',
    price: 40,
    credits: 120,
    inclusions: [
      {
        label: '120 Credits',
        isIncluded: true,
      },
      {
        label: 'Full Access to Services',
        isIncluded: true,
      },
      {
        label: 'Priority Customer Support',
        isIncluded: true,
      },
      {
        label: 'Priority Updates',
        isIncluded: false,
      },
    ],
  },
  {
    _id: 3,
    name: 'Premium Package',
    icon: '/assets/icons/free-plan.svg',
    price: 199,
    credits: 2000,
    inclusions: [
      {
        label: '2000 Credits',
        isIncluded: true,
      },
      {
        label: 'Full Access to Services',
        isIncluded: true,
      },
      {
        label: 'Priority Customer Support',
        isIncluded: true,
      },
      {
        label: 'Priority Updates',
        isIncluded: true,
      },
    ],
  },
] as const;

export const transformationTypes = {
  restore: {
    type: TransformationType.RESTORE,
    title: 'Restore Image',
    subTitle: 'Refine images by removing noise and imperfections',
    config: { restore: true },
    icon: 'image.svg',
  },
  removeBackground: {
    type: TransformationType.REMOVE_BACKGROUND,
    title: 'Background Remove',
    subTitle: 'Removes the background of the image using AI',
    config: { removeBackground: true },
    icon: 'camera.svg',
  },
  fill: {
    type: TransformationType.FILL,
    title: 'Generative Fill',
    subTitle: "Enhance an image's dimensions using AI outpainting",
    config: { fillBackground: true },
    icon: 'stars.svg',
  },
  remove: {
    type: TransformationType.REMOVE,
    title: 'Object Remove',
    subTitle: 'Identify and eliminate objects from images',
    config: {
      remove: { prompt: '', removeShadow: true, multiple: true },
    },
    icon: 'scan.svg',
  },
  recolor: {
    type: TransformationType.RECOLOR,
    title: 'Object Recolor',
    subTitle: 'Identify and recolor objects from the image',
    config: {
      recolor: { prompt: '', to: '', multiple: true },
    },
    icon: 'filter.svg',
  },
} as const;

export const aspectRatioOptions = {
  '1:1': {
    aspectRatio: '1:1',
    label: 'Square (1:1)',
    width: 1000,
    height: 1000,
  },
  '3:4': {
    aspectRatio: '3:4',
    label: 'Standard Portrait (3:4)',
    width: 1000,
    height: 1334,
  },
  '9:16': {
    aspectRatio: '9:16',
    label: 'Phone Portrait (9:16)',
    width: 1000,
    height: 1778,
  },
} as const;

export const defaultValues = {
  title: '',
  aspectRatio: '',
  color: '',
  prompt: '',
  publicId: '',
} as const;

export const creditFee = -1;
