import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import './CardSkeleton.css'

const CardSkeleton = () => {
  return (
    <div>
        <SkeletonTheme highlightColor='#242424' baseColor='#2d2d2d'>
        <div className='movie-card'>
                <Skeleton className='skeleton-card' style={{marginLeft:'3px'}}/>
                <Skeleton count={2} style={{marginTop:'6px'}}/>
            </div>
        </SkeletonTheme>
    </div>
  )
}

export default CardSkeleton
