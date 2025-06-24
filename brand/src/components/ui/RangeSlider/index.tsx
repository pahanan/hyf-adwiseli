import { useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { Slider as BaseSlider, sliderClasses } from '@mui/base/Slider'
import { alpha, styled } from '@mui/system'

type RangeSlider = {
	min: number
	max: number
	step: number
	valueLabelFormatter: (value: number) => string
	value: {
		min: number
		max: number
	}
	onChange: (value: { min: number; max: number }) => void
}

export default function RangeSlider(props: RangeSlider) {
	const [values, setValues] = useState(
		props.value
			? [props.value.min, props.value.max]
			: [props.min, props.max]
	)

	const debouncedSearch = useDebouncedCallback((value: number[]) => {
		if (!value) {
			props.onChange({ min: props.min, max: props.max })
		} else {
			props.onChange({ min: value[0], max: value[1] })
		}
	}, 300)

	return (
		<Slider
			value={values}
			onChange={(event, value: any) => {
				setValues(value)
				debouncedSearch(value)
			}}
			valuelabeldisplay="auto"
			disableSwap
			max={props.max}
			min={props.min}
			step={props.step}
			valueLabelFormat={props.valueLabelFormatter}
			slots={{ valueLabel: SliderValueLabel }}
		/>
	)
}

interface SliderValueLabelProps {
	children: React.ReactElement<any>
}

function SliderValueLabel({ children }: SliderValueLabelProps) {
	return <span className="valueLabel">{children}</span>
}

const Slider = styled(BaseSlider)(
	({ theme }) =>
		`
	color: #FF5500;
	height: 6px;
	width: 100%;
	padding: 16px 0;
	display: inline-flex;
	align-items: center;
	position: relative;
	cursor: pointer;
	touch-action: none;
	-webkit-tap-highlight-color: transparent;
  
	&.${sliderClasses.disabled} {
	  pointer-events: none;
	  cursor: default;
	  color: #e5e5e5;
	  opacity: 0.4;
	}
  
	& .${sliderClasses.rail} {
	  display: block;
	  position: absolute;
	  width: 100%;
	  height: 4px;
	  border-radius: 6px;
	  background-color: currentColor;
	  opacity: 0.3;
	}
  
	& .${sliderClasses.track} {
	  display: block;
	  position: absolute;
	  height: 4px;
	  border-radius: 6px;
	  background-color: currentColor;
	}
  
	& .${sliderClasses.thumb} {
	  display: flex;
	  align-items: center;
	  justify-content: center;
	  position: absolute;
	  margin-left: -6px;
	  width: 14px;
	  height: 14px;
	  box-sizing: border-box;
	  border-radius: 50%;
	  outline: 0;
	  background-color: #FF5500;
	  transition-property: box-shadow, transform;
	  transition-timing-function: ease;
	  transition-duration: 120ms;
	  transform-origin: center;
  
	  &:hover {
		box-shadow: 0 0 0 2px ${alpha('#FF5500', 0.3)};
	  }
  
	  &.${sliderClasses.focusVisible} {
		box-shadow: 0 0 0 3px ${alpha('#FF5500', 0.5)};
		outline: none;
	  }
  
	  &.${sliderClasses.active} {
		box-shadow: 0 0 0 3px ${alpha('#FF5500', 0.5)};
		outline: none;
	  }
	}
	& .valueLabel {
	  font-weight: 600;
	  margin-top: 1rem;
	  background-color: #ffffff;
	  color: #1F2937;
	  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
	  border-width: 1px;
	  font-size: 12px;
	  position: relative;
	  top: 2em;
	  text-align: center;
	  align-self: center;
	  padding: 3px 6px;
	  border-radius: 8px;
	}
  `
)
