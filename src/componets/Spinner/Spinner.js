import React from 'react';
import styles from './SpinnerStyle.module.css';

export default function Spinner(){
    return(
        <div className={styles.spinner}>
            <div className={styles.loader}>Loading...</div>
        </div>
    )
}
