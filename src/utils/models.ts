export interface Question {
	question: string;
	answer: string;
}

export interface PinnedWork {
	title: string;
	description: string;
	image?: string;
	preview?: string;
	link?: string;
}

export interface Review {
	name: string;
	stars: number;
	review: string;
}

export interface MediaSource {
	src: string;
	type: string;
}

export interface MediaFile {
	poster?: string;
	sources: MediaSource[];
}

export class PreviewClick extends Event {
	public static NAME = "preview-click";
	constructor(public readonly src: string) {
		super(PreviewClick.NAME, {
			bubbles: true,
			composed: true,
		});

        console.log("sending @preview event with", this);
	}
}
