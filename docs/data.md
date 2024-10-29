# Data

Some of the new elements have a `src` attribute, as they are fed by a JSON or YAML file. The configuration files reside inside `public/pages` directories, so they are easily picked up by Vite and placed beside the HTML files they are used in. The four config files are:

|Path|Used by|Copied to|Comments|
|-|-|-|-|
|`pages/works/pinned.[json\|yaml]`|`<work-list>`|`dist/works`|Showcased project descriptions.|
|`pages/works/reviews.[json\|yaml]`|`<review-list>`|`dist/works`|Showcased reviews.|
|`pages/video/carousel.[json\|yaml]`|`<video-carousel>`|`dist/video`|Videos, with multiple source types per video.|
|`pages/faq/questions.[json\|yaml]`|`<faq-accordion>`|`dist/faq`|Simple question and answer list|

## Pinned work

```ts
export interface PinnedWork {
  title: string;
  description: string;
  image?: string;
  preview?: string;
  link?: string;
}
```

|Field|Type|Optional|Defaults to|Used for|
|-|-|-|-|-|
|title|text|no|-|Tile's title.|
|description|markdown|no|-|Tile's description.|
|image|img URL|yes|preview|Placed on top of the tile.|
|preview|img URL|yes|_absent_|Is shown expanded.|
|link|page URL|yes|_absent_|Adds additional button linking to the page.|

JSON example:

```json
[
    {
        "title": "Project 1",
        "description": "Description for _Project #1_.\n\nSecond paragraph. _Italics_, **bold**, [link](https://daringfireball.net/projects/markdown/syntax)",
        "preview": "/images/preview1.png"
    },
    {
        "title": "Project 2",
        "description": "Description for _Project #2_.",
        "image": "/images/tiles/project1.png",
        "preview": "/images/preview2.png"
    },
]
```

YAML example:

```yaml
- title: Project 1
  preview: /images/preview1.png
  description: |
    Description for _Project #1_.

    Second paragraph. _Italics_, **bold**, [link](https://daringfireball.net/projects/markdown/syntax)

- title: Project 2
  description: >
    Description for _Project #2_
  image: /images/tiles/project1.png
  preview: /images/preview2.png
```

## Reviews

```ts
export interface Review {
  name: string;
  stars: number;
  review: string;
}
```

|Field|Type|Used for|
|-|-|-|
|name|text|Reviewer's name|
|stars|number|How many starts to light up. Putting `3.1` will be treated as 3, while both `3.5` and `3.7` &mdash; as 3&half;.|
|review|markdown|Content of the review.|

JSON example:

```json
[
    {
        "name": "John Doe",
        "stars": 5,
        "review": "WAVES transformed our online presence. Their creativity and attention to detail are unmatched!\n\nSecond line will be another paragraph. Some **Markdown** is *supported*, yay."
    },
    {
        "name": "Jane Smith",
        "stars": 4.5,
        "review": "Working with WAVES was a game-changer for our brand. Highly recommended!"
    },
]
```

YAML example:

```yaml
- name: John Doe
  stars: 5
  review: |
    WAVES transformed our online presence. Their creativity and attention to detail are unmatched!

    Second line will be another paragraph. Some **Markdown** is *supported*, yay.

- name: Jane Smith
  stars: 4.5
  review: Working with WAVES was a game-changer for our brand. Highly recommended!
```

## Video Files

```ts
export interface MediaSource {
  src: string;
  type: string;
}

export interface MediaFile {
  poster?: string;
  sources: MediaSource[];
}
```

Each media file represent separate video, each media source represents the same video, but encoded with different codec.

|Field|Type|Used for|
|-|-|-|
|poster|img URL|`<video poster>` attribute (if present)|
|sources|list|Each source, representing the same video|
|sources[_n_].src|video URL|`<source src>` attribute|
|sources[_n_].type|media type|`<source type>` attribute; at minimum, the MIME type; optionally, can contain `codec` identification of this particular `MediaSource`.|

JSON example:

```json
[
    {
        "sources": [
            {"src": "video1.mp4", "type": "video/mp4"},
            {
                "src": "video1.ogg",
                "type": "video/ogg; codec=\"theora, vorbis\""
            },
        ]
    },
    {
        "poster": "/images/poster2.jpg",
        "sources": [
            {
                "src": "video2.mov",
                "type": "video/mp4; codec=\"avc1.4d401e, aac\""
            },
            {
                "src": "video2.mkv",
                "type": "video/matroska"
            },
        ]
    },
]
```

YAML example:

```yaml
- sources:
  - src: video1.mp4
    type: video/mp4
  - src: video1.ogg
    type: video/ogg; codec="theora, vorbis"

- poster: /images/poster2.jpg
  sources:
  - src: video2.mov
    type: video/mp4; codec="avc1.4d401e, aac"
  - src: video2.mkv
    type: video/matroska
```

## FAQ

```ts
export interface Question {
  question: string;
  answer: string;
}
```

|Field|Type|Used for|
|-|-|-|
|question|text|Always-visible part of the FAQ item|
|answer|markdown|Revealable part of the FAQ item|

JSON example:

```json
[
    {
        "question": "Why is a Crow like a Writing Desk?",
        "answer": "_Some lengthy analysis of Alice in Wonderland._"
    },
]
```

YAML example:

```yaml
- question: Why is a Crow like a Writing Desk?
  answer: _Some lengthy analysis of Alice in Wonderland._
```
