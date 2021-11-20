import { PureComponent } from 'react';

import styles from './NotFound.scss';

class NotFound extends PureComponent {
  render() {
    return <h1 className={styles.Container}>Not Found</h1>;
  }
}

export default NotFound;
