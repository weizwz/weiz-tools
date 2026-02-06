/**
 * 预设布局模板
 */
import { LayoutTemplate } from './types'

// 生成唯一 ID
let idCounter = 0
const genId = () => `slot-${++idCounter}`

// 正规排版模板（11种）
export const regularLayouts: LayoutTemplate[] = [
  // 2张图片布局
  {
    id: 'regular-2-1',
    name: '两个小卡',
    type: 'regular',
    cardCount: 2,
    rows: [
      [
        { id: genId(), size: 'small' },
        { id: genId(), size: 'small' }
      ]
    ]
  },
  {
    id: 'regular-2-2',
    name: '一个中卡',
    type: 'regular',
    cardCount: 1,
    rows: [[{ id: genId(), size: 'medium' }]]
  },
  // 3张图片布局
  {
    id: 'regular-3-1',
    name: '小卡+中卡',
    type: 'regular',
    cardCount: 3,
    rows: [
      [
        { id: genId(), size: 'small' },
        { id: genId(), size: 'small' }
      ],
      [{ id: genId(), size: 'medium' }]
    ]
  },
  {
    id: 'regular-3-2',
    name: '中卡+小卡',
    type: 'regular',
    cardCount: 3,
    rows: [
      [{ id: genId(), size: 'medium' }],
      [
        { id: genId(), size: 'small' },
        { id: genId(), size: 'small' }
      ]
    ]
  },
  // 4张图片布局
  {
    id: 'regular-4-1',
    name: '四个小卡',
    type: 'regular',
    cardCount: 4,
    rows: [
      [
        { id: genId(), size: 'small' },
        { id: genId(), size: 'small' }
      ],
      [
        { id: genId(), size: 'small' },
        { id: genId(), size: 'small' }
      ]
    ]
  },
  {
    id: 'regular-4-2',
    name: '两个中卡',
    type: 'regular',
    cardCount: 2,
    rows: [[{ id: genId(), size: 'medium' }], [{ id: genId(), size: 'medium' }]]
  },
  {
    id: 'regular-4-3',
    name: '小卡+中卡+小卡',
    type: 'regular',
    cardCount: 4,
    rows: [
      [
        { id: genId(), size: 'small' },
        { id: genId(), size: 'small' }
      ],
      [{ id: genId(), size: 'medium' }],
      [
        { id: genId(), size: 'small' },
        { id: genId(), size: 'small' }
      ]
    ]
  },
  // 大卡布局
  {
    id: 'regular-5-1',
    name: '一个大卡',
    type: 'regular',
    cardCount: 1,
    rows: [[{ id: genId(), size: 'large', rowSpan: 2 }]]
  },
  {
    id: 'regular-5-2',
    name: '小卡+大卡',
    type: 'regular',
    cardCount: 3,
    rows: [
      [
        { id: genId(), size: 'small' },
        { id: genId(), size: 'small' }
      ],
      [{ id: genId(), size: 'large', rowSpan: 2 }]
    ]
  },
  {
    id: 'regular-5-3',
    name: '大卡+小卡',
    type: 'regular',
    cardCount: 3,
    rows: [
      [{ id: genId(), size: 'large', rowSpan: 2 }],
      [
        { id: genId(), size: 'small' },
        { id: genId(), size: 'small' }
      ]
    ]
  },
  {
    id: 'regular-5-4',
    name: '中卡+大卡',
    type: 'regular',
    cardCount: 2,
    rows: [[{ id: genId(), size: 'medium' }], [{ id: genId(), size: 'large', rowSpan: 2 }]]
  }
]

// 侧向排版模板（倾斜27°）
export const tiltLayouts: LayoutTemplate[] = [
  {
    id: 'tilt-1',
    name: '侧向排版',
    type: 'tilt',
    cardCount: 6,
    rows: [
      [
        { id: genId(), size: 'small' },
        { id: genId(), size: 'small' }
      ],
      [{ id: genId(), size: 'medium' }],
      [
        { id: genId(), size: 'small' },
        { id: genId(), size: 'small' }
      ],
      [{ id: genId(), size: 'medium' }],
      [
        { id: genId(), size: 'small' },
        { id: genId(), size: 'small' }
      ],
      [{ id: genId(), size: 'medium' }]
    ]
  }
]

// 所有布局
export const allLayouts: LayoutTemplate[] = [...regularLayouts, ...tiltLayouts]

// 按卡片数量分组（用于布局选择面板）
export const layoutsByCardCount = regularLayouts.reduce(
  (acc, layout) => {
    const count = layout.cardCount
    if (!acc[count]) {
      acc[count] = []
    }
    acc[count].push(layout)
    return acc
  },
  {} as Record<number, LayoutTemplate[]>
)
