import React, { useState } from 'react';
import styles from './index.scss';

const Swimlane = () => {
  const [axis] = useState(0);

  return (
    <div className={styles.wrapper}>
      <div className={styles.swimlane}>
        <ul
          style={{
            transform: `translate3d(${axis}px, 0, 0)`,
          }}
        />
      </div>
    </div>
  );
};

export default Swimlane;
