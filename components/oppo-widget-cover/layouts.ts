/**
 * 预设布局模板
 */
import { LayoutTemplate } from './types'

// 生成唯一 ID
let idCounter = 0
const genId = () => `slot-${++idCounter}`

// 正规排版模板（12种）
export const regularLayouts: LayoutTemplate[] = [
  // 排版1: 大卡 + 中卡（2张图片）
  {
    id: 'regular-1',
    name: '排版1',
    type: 'regular',
    cardCount: 2,
    rows: [[{ id: genId(), size: 'large', rowSpan: 2 }], [{ id: genId(), size: 'medium' }]]
  },
  // 排版2: 中卡 + 大卡（2张图片）
  {
    id: 'regular-2',
    name: '排版2',
    type: 'regular',
    cardCount: 2,
    rows: [[{ id: genId(), size: 'medium' }], [{ id: genId(), size: 'large', rowSpan: 2 }]]
  },
  // 排版3: 大卡 + 小卡+小卡（3张图片）
  {
    id: 'regular-3',
    name: '排版3',
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
  // 排版4: 小卡+小卡 + 大卡（3张图片）
  {
    id: 'regular-4',
    name: '排版4',
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
  // 排版5: 中卡 + 中卡 + 中卡（3张图片）
  {
    id: 'regular-5',
    name: '排版5',
    type: 'regular',
    cardCount: 3,
    rows: [[{ id: genId(), size: 'medium' }], [{ id: genId(), size: 'medium' }], [{ id: genId(), size: 'medium' }]]
  },
  // 排版6: 小卡+小卡 + 中卡 + 中卡（4张图片）
  {
    id: 'regular-6',
    name: '排版6',
    type: 'regular',
    cardCount: 4,
    rows: [
      [
        { id: genId(), size: 'small' },
        { id: genId(), size: 'small' }
      ],
      [{ id: genId(), size: 'medium' }],
      [{ id: genId(), size: 'medium' }]
    ]
  },
  // 排版7: 中卡 + 小卡+小卡 + 中卡（4张图片）
  {
    id: 'regular-7',
    name: '排版7',
    type: 'regular',
    cardCount: 4,
    rows: [
      [{ id: genId(), size: 'medium' }],
      [
        { id: genId(), size: 'small' },
        { id: genId(), size: 'small' }
      ],
      [{ id: genId(), size: 'medium' }]
    ]
  },
  // 排版8: 中卡 + 中卡 + 小卡+小卡（4张图片）
  {
    id: 'regular-8',
    name: '排版8',
    type: 'regular',
    cardCount: 4,
    rows: [
      [{ id: genId(), size: 'medium' }],
      [{ id: genId(), size: 'medium' }],
      [
        { id: genId(), size: 'small' },
        { id: genId(), size: 'small' }
      ]
    ]
  },
  // 排版9: 小卡+小卡 + 小卡+小卡 + 中卡（5张图片）
  {
    id: 'regular-9',
    name: '排版9',
    type: 'regular',
    cardCount: 5,
    rows: [
      [
        { id: genId(), size: 'small' },
        { id: genId(), size: 'small' }
      ],
      [
        { id: genId(), size: 'small' },
        { id: genId(), size: 'small' }
      ],
      [{ id: genId(), size: 'medium' }]
    ]
  },
  // 排版10: 中卡 + 小卡+小卡 + 小卡+小卡（5张图片）
  {
    id: 'regular-11',
    name: '排版11',
    type: 'regular',
    cardCount: 5,
    rows: [
      [{ id: genId(), size: 'medium' }],
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
  // 排版11: 小卡+小卡 + 中卡 + 小卡+小卡（5张图片）
  {
    id: 'regular-10',
    name: '排版10',
    type: 'regular',
    cardCount: 5,
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
  // 排版12: 小卡×6（6张图片）
  {
    id: 'regular-12',
    name: '排版12',
    type: 'regular',
    cardCount: 6,
    rows: [
      [
        { id: genId(), size: 'small' },
        { id: genId(), size: 'small' }
      ],
      [
        { id: genId(), size: 'small' },
        { id: genId(), size: 'small' }
      ],
      [
        { id: genId(), size: 'small' },
        { id: genId(), size: 'small' }
      ]
    ]
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
