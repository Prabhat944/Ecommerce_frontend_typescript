import React, { useEffect, useState } from 'react'
import Select, { ActionMeta, StylesConfig } from 'react-select';
import chroma from "chroma-js";

const dot = (color = 'transparent') => ({
    alignItems: 'center',
    display: 'flex',
    height:'45px',
  
    ':before': {
      backgroundColor: color,
      borderRadius: 10,
      content: '" "',
      display: 'block',
      marginRight: 8,
      height: 10,
      width: 10,
    },
  });
  
  const colourStyles: StylesConfig = {
    control: (styles,{ isFocused }) => ({ ...styles, backgroundColor: 'white','&:hover': {
        borderColor: '#262626',
      },
      boxShadow: isFocused ? '0 0 0 1px black' : 'none',  }),
    option: (styles, { isDisabled, isFocused, isSelected }) => {
      const color = chroma("#262626");
      return {
        ...styles,
        backgroundColor: isDisabled
          ? undefined
          : isSelected
          ? "#262626"
          : isFocused
          ? color.alpha(0.1).css()
          : undefined,
        color: isDisabled
          ? '#ccc'
          : isSelected
          ? chroma.contrast(color, 'white') > 2
            ? 'white'
            : 'black'
          : "#262626",
        cursor: isDisabled ? 'not-allowed' : 'default',
  
        ':active': {
          ...styles[':active'],
          backgroundColor: !isDisabled
            ? isSelected
              ? "#262626"
              : color.alpha(0.3).css()
            : undefined,
        },
      };
    },
    input: (styles) => ({ ...styles, ...dot() }),
    placeholder: (styles) => ({ ...styles, ...dot('#ccc') }),
    singleValue: (styles) => ({ ...styles, ...dot("#262626") }),
  };

  interface SelectDropdownProps {
    optionList: { value: string; label: string }[];
    setSort: (sort: string) => {};
    sort: string;
  }


const SelectDropdown:React.FC<SelectDropdownProps> = ({optionList=[{value: "",label: ""}],setSort,sort}) => {
    const [selectedValue, setSelectedValue] = useState<{ value: string; label: string }>({ value: '', label: '' });

    const setValueHandler = (newValue: any, actionMeta: ActionMeta<any>) => {
      const { value, label } = newValue;
        setSort(value || '');
        setSelectedValue({ value, label });
        console.log(actionMeta);
    };

    useEffect(() => {
        if (sort) {
          setSelectedValue(optionList.find(e => e.value === sort) || { value: '', label: '' });
        }
      }, [sort, optionList]);
  return (
    <Select
        placeholder={"None"}
        defaultValue={optionList?.find(e=>e.value === selectedValue.value)}
        onChange={setValueHandler}
        options={optionList}
        styles={colourStyles}
    />
  )
}

export default SelectDropdown
