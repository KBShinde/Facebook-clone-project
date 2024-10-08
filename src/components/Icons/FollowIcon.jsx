import React from 'react'

const FollowIcon = (props) => {
    return (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          height="1em"
          width="1em"
          {...props}
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path d="M21 3a1 1 0 011 1v14a1 1 0 01-1 1H6.455L2 22.5V4a1 1 0 011-1h18zm-4 4h-2v8h2V7zm-6 1H9v1.999L7 10v2l2-.001V14h2v-2.001L13 12v-2l-2-.001V8z" />
        </svg>
      );
    }

export default FollowIcon
