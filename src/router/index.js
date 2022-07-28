import { Redirect } from 'react-router-dom'

import DisCover from '@/pages/discover'
import Recommend from '@/pages/discover/c-pages/recommend'
import RankingList from '@/pages/discover/c-pages/ranking-list'
import SongSheet from '@/pages/discover/c-pages/song-sheet'
import AnchorStation from '@/pages/discover/c-pages/anchor-station'
import Singer from '@/pages/discover/c-pages/singer'
import NewDisc from '@/pages/discover/c-pages/new-disc'

import Mine from '@/pages/mine'
import Friends from '@/pages/friends'

const routes = [
  {
    path: '/',
    exact: true,
    render() {
      return <Redirect to={'/discover'} />
    },
  },
  {
    path: '/discover',
    component: DisCover,
    routes: [
      {
        path: '/discover',
        exact: true,
        render: () => <Redirect to={'/discover/recommend'} />
      },
      {
        path: '/discover/recommend',
        component: Recommend
      },
      {
        path: '/discover/rankinglist',
        component: RankingList
      },
      {
        path: '/discover/songsheet',
        component: SongSheet
      },
      {
        path: '/discover/anchorstation',
        component: AnchorStation
      },
      {
        path: '/discover/singer',
        component: Singer
      },
      {
        path: '/discover/newdisc',
        component: NewDisc
      },
    ]
  },
  {
    path: '/friends',
    component: Friends
  },
  {
    path: '/mine',
    component: Mine
  }
]
export default routes