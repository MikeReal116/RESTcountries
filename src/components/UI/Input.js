import React, { useRef } from 'react';
import '../../Css/Input.css';

const Input = (props) => {
  const InputRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();
    props.onSearch(InputRef.current.value);
  };
  return (
    <form className="form" onSubmit={submitHandler}>
      <div className="form__input">
        <input type="text" placeholder="search country" ref={InputRef} />
      </div>
    </form>
  );
};

export default Input;
