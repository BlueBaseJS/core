declare module '@storybook/react';
declare var module: any;

// import * as React from 'react';

// declare module 'storybook__react' {
//   export type Renderable = React.ComponentType | JSX.Element;
//   export type RenderFunction = () => Renderable | Renderable[];

// export type StoryDecorator = (story: RenderFunction, context: { kind: string, story: string }) => Renderable | null;

// 	export interface Story {
// 		readonly kind: string;
// 		add(storyName: string, callback: RenderFunction): this;
// 		addDecorator(decorator: StoryDecorator): this;
// 	}

//   export function addDecorator(decorator: StoryDecorator): void;
//   export function configure(fn: () => void, module: any): void;
//   export function setAddon(addon: object): void;
//   export function storiesOf(name: string, module: any): Story;
//   export function storiesOf<T>(name: string, module: any): Story & T;
//   export function forceReRender(): void;

// 	export interface StoryObject {
// 		name: string;
// 		render: RenderFunction;
// 	}

// 	export interface StoryBucket {
// 		kind: string;
// 		stories: StoryObject[];
// 	}

//   export function getStorybook(): StoryBucket[];
// }
