import {mapImageSources, mapWarningImageSources} from './mapImageSources'
import {ImageSources} from '@/types/image'

describe('mapImageSources', () => {
  test('handle undefined', () => {
    expect(mapImageSources()).toEqual([])
  })
  test('normal use case', () => {
    expect(
      mapImageSources({
        '220px': {
          description: 'description',
          filename: 'filename',
          image_id: 'image_id',
          size: '220px',
          url: 'url220px',
        },
        '460px': {
          description: 'description',
          filename: 'filename',
          image_id: 'image_id',
          size: '460px',
          url: 'url460px',
        },
        '700px': {
          description: 'description',
          filename: 'filename',
          image_id: 'image_id',
          size: '700px',
          url: 'url700px',
        },
        '80px': {
          description: 'description',
          filename: 'filename',
          image_id: 'image_id',
          size: '80px',
          url: 'url80px',
        },
        orig: {
          description: 'description',
          filename: 'filename',
          image_id: 'image_id',
          size: '940px',
          url: 'urlorig',
        },
      }),
    ).toEqual([
      {
        uri: 'url220px',
        width: 220,
        height: Math.floor(220 / (940 / 415)),
      },
      {
        uri: 'url460px',
        width: 460,
        height: Math.floor(460 / (940 / 415)),
      },
      {
        uri: 'url700px',
        width: 700,
        height: Math.floor(700 / (940 / 415)),
      },
      {
        uri: 'url80px',
        width: 80,
        height: Math.floor(80 / (940 / 415)),
      },
      {
        uri: 'urlorig',
        width: 940,
        height: Math.floor(940 / (940 / 415)),
      },
    ])
  })
  test('original image is resized to 940', () => {
    expect(
      mapImageSources({
        orig: {
          description: 'description',
          filename: 'filename',
          image_id: 'image_id',
          size: '1080px',
          url: 'urlorig',
        },
      } as ImageSources),
    ).toEqual([
      {
        uri: 'urlorig',
        width: 940,
        height: Math.floor(940 / (940 / 415)),
      },
    ])
  })
})

describe('mapWarningImageSources', () => {
  test('handle undefined', () => {
    expect(mapWarningImageSources()).toEqual([])
  })
  test('normal use case', () => {
    expect(
      mapWarningImageSources([
        {
          height: 800,
          image_id: 'image_id',
          mime_type: 'mime_type',
          url: 'url800x450',
          width: 450,
        },
        {
          height: 1600,
          image_id: 'image_id',
          mime_type: 'mime_type',
          url: 'url1600x900',
          width: 900,
        },
      ]),
    ).toEqual([
      {
        uri: 'url800x450',
        width: 450,
        height: 800,
      },
      {
        uri: 'url1600x900',
        width: 900,
        height: 1600,
      },
    ])
  })
})
