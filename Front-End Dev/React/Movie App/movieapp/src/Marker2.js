import React from 'react';
import './Marker2.css';

const Marker2 = (props: any) => {
    const { color, name, id } = props;
    return (
      <div className="marker2"
        style={{ backgroundColor: color, cursor: 'pointer'}}
        title={name}
      />
    );
  };

  export default Marker2;