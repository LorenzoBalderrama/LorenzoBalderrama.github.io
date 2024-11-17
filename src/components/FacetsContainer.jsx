import React, { useState, useEffect } from "react";
import { RefinementList, useRange } from 'react-instantsearch';
import { RangeSlider as SpectrumRangeSlider } from '@adobe/react-spectrum';

export function FacetsContainer() {
  return (
    <>
    <RefinementList attribute="characters"/>
    <RangeSlider attribute="prices"/>
    </>
    );
   
}

// Code from Algolia
export function RangeSlider(props) {
    const { start, range, canRefine, refine } = useRange(props);
    const { min, max } = range;
    const [value, setValue] = useState({ start: min, end: max });
  
    const from = Math.max(min, Number.isFinite(start[0]) ? start[0] : min);
    const to = Math.min(max, Number.isFinite(start[1]) ? start[1] : max);
  
    useEffect(() => {
      setValue({ start: from, end: to });
    }, [from, to]);
  
    return (
      <SpectrumRangeSlider
        label="Price range"
        minValue={min}
        maxValue={max}
        value={value}
        onChange={setValue}
        onChangeEnd={({ start, end }) => refine([start, end])}
        isDisabled={!canRefine}
      />
    );
  }