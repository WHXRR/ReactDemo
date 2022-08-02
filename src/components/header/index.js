import React, { memo, useState } from 'react'
import { NavLink } from 'react-router-dom'

import { shallowEqual, useSelector } from 'react-redux'

import { SmileTwoTone, SearchOutlined, UserOutlined, VerticalAlignBottomOutlined, HighlightOutlined, MehTwoTone } from '@ant-design/icons';
import { Dropdown, Input, Menu } from 'antd';

import { menu } from '@/common/header_menu'
import LoginDialog from '../login-dialog';

import {
  HearderWrapper,
  HeaderStyle
} from './style'

const Header = memo(() => {


  const otherMenu = () => (
    <Menu
      onClick={onClick}
      items={[
        {
          key: '1',
          label: '登录',
          icon: <UserOutlined />,
        },
        {
          key: '2',
          label: <a target="_blank" rel="noopener noreferrer" href="https://music.163.com/#/login?targetUrl=%2Fcreatorcenter">
            下载客户端
          </a>,
          icon: <VerticalAlignBottomOutlined />,
        },
        {
          key: '3',
          label: <a target="_blank" rel="noopener noreferrer" href="https://music.163.com/#/login?targetUrl=%2Fcreatorcenter">
            创作者中心
          </a>,
          icon: <HighlightOutlined />,
        }
      ]}
    />
  )
  const onClick = ({key}) => {
    if (key === '1') {
      changeVisible(true)
    }
  }

  // 登录弹窗
  const [visible, changeVisible] = useState(false)
  const handleOk = () => {
    changeVisible(false)
  }
  const handleCancel = () => {
    changeVisible(false)
  }

  const { token } = useSelector(
    state => ({
      token: state.getIn(['songDetail', 'token']),
    }),
    shallowEqual
  )

  let [height, changeHeight] = useState(0)
  const bindHandleScroll = (event) => {
    const scrollTop = event.srcElement.documentElement.scrollTop
      || window.pageYOffset
      || event.srcElement.body.scrollTop;
    changeHeight(() => height = scrollTop)
  }
  window.addEventListener('scroll', bindHandleScroll)

  return (
    <HeaderStyle>
      <HearderWrapper className={height ? 'shadow' : ''}>
        <Dropdown overlay={otherMenu}>
          {
            token
              ?
              <SmileTwoTone className='logo' twoToneColor='#00badb' />
              :
              <MehTwoTone className='logo' twoToneColor='#00badb' />
          }
        </Dropdown>
        <div className='center'>
          <Dropdown overlay={menu}>
            <NavLink to="/discover">发现音乐</NavLink>
          </Dropdown>
          <NavLink to="/friends">我的朋友</NavLink>
          <NavLink to="/mine">我的音乐</NavLink>
        </div>
        <Input
          className='search-ipt'
          placeholder="随便输..."
          suffix={
            <SearchOutlined className='search-icon' />
          }
        />
      </HearderWrapper>
      <LoginDialog visible={visible} handleOk={handleOk} handleCancel={handleCancel} />
    </HeaderStyle>
  )
})

export default Header