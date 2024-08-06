import classNames from 'classnames';
import React, { useRef, useState, memo } from 'react';
import form from './style.module.scss';

const minSymbols = 3;

interface FormProps {
  onFormSubmit: (_text: string) => void;
}

const Form = memo(({ onFormSubmit }: FormProps) => {
  const [text, setText] = useState('');
  const [symbolsAmount, setSymbolsAmount] = useState(0);
  const [isError, setIsError] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  function handleInput(event: React.ChangeEvent<HTMLInputElement>) {
    const { length } = event.target.value;

    if (length > 3) {
      setIsError(false);
    }

    if (length > 55) {
      event.target.value = text;
    } else {
      setText(() => event.target.value);
      setSymbolsAmount(() => event.target.value.length);
    }
  }

  function handleFormSubmit() {
    if (text.length < minSymbols && inputRef.current) {
      setIsError(true);
      inputRef.current.focus();
    } else {
      onFormSubmit(text);
      setText(() => '');
      setSymbolsAmount(() => 0);
    }
  }

  function handleEnter(e: React.KeyboardEvent) {
    if (e.key === 'Enter') handleFormSubmit();
  }

  return (
    <div className={form.element}>
      <div className={form.wrap}>
        <input
          className={form.input}
          type="textarea"
          required
          ref={inputRef}
          value={text}
          onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
            handleInput(e);
          }}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
            handleEnter(e)
          }
        />
        <p
          className={classNames(form.counter, {
            [form.error]: isError,
          })}
        >
          {symbolsAmount}
          /55
        </p>
        <p
          className={classNames(form.warning, form.error, {
            [form.warning_visible]: isError,
          })}
        >
          Note should contain from {minSymbols} to 55 symbols
        </p>
        <button
          type="button"
          className={form.button}
          onClick={handleFormSubmit}
        >
          Add
        </button>
      </div>
    </div>
  );
});

export default Form;
