import React from 'react';

// export function FullName({ user }) {
//   return `${user.first_name} ${user.last_name}`;
// }

// export function NiceDate({ date, format = 'Do MMMM YYYY' }) {
//   return formatDate(date, format)
// }

// export function Hyph() {
//   return <span className='Hyph'>{' - '}</span>
// }

export function Button({ className, ...props }) {
  return <button className={['Button', className].join(' ')} {...props} />
}

// export function Textarea({ className, ...props }) {
//   return (
//     <textarea className={['Textarea', className].join(' ')} {...props} />
//   )
// }

// export function Required({ className, ...props }) {
//   return (
//     <span className={['Required', className].join(' ')} {...props}>
//       &#42;
//     </span>
//   )
// }

export function FormatName(firstName) {
  if (!firstName.endsWith('s')) {
    return `${firstName}'s`
  } else {
    return `${firstName}'`
  }
}

export function Section({ className, list, ...props }) {
  const classes = [
    'Section',
    list && 'Section--list',
    className,
  ].filter(Boolean).join(' ')
  return (
    <section className={classes} {...props} />
  )
}

function DisplayPlural(unitData, amount) {
  //Selects proper display unit based on unit properties, defaults to '' otherwise.
  let unit = '';
  if (unitData) {
    (amount === 1)
      ? unit = unitData.unit_single
      : unit = unitData.unit_plural
  };
  return unit;
}

//If converted, display converted amount, otherwise display preset amount.
export function DisplayAmountWithUnit(ingredient, converted) {

  //Amount will display as converted amount if set so and it exists.
  let amount = (!converted || ingredient.conversion === undefined) ? ingredient.amount : ingredient.conversion.amount;
  //Unit will display the proper form of unit, and also as the converted amount if set so and it exists.
  const unit = (!converted || ingredient.conversion === undefined)
    ? DisplayPlural(ingredient.unit_data, amount)
    : DisplayPlural(ingredient.conversion, amount)

  //If the ingredient amount is zero and set to none, display nothing, otherwise display 0.
  return (ingredient.unit_set === 'none' ? '' : `${amount} `) + `${unit}`
}

//Generate output for currentIngredient.
export function IngredientEditUnitOutput(amount, unit_set, unit_plural, unit_single) {
  const unit = DisplayPlural({ unit_plural, unit_single}, parseFloat(amount));
  return (unit_set === 'none' ? '' : `${amount} `) + `${unit}`
  // return `${!!amount ? amount : '...'} ${!!unit ? unit : '...'}`
}

export function PrepTimeOutput(props) {
  // Displays the prep time depending on its length:
  //'x Hours, x Minutes', 'x Hours', or 'x Minutes'.
  let content = '';
  let { hours, minutes } = props

  hours = parseInt(hours)
  minutes = parseInt(minutes)

  if (!hours && !minutes) {
    content = 'No prep time entered.'
  }
  if (!!hours) { content += `${hours} Hour${(hours > 1 || hours < -1) ? 's' : ''}` }
  if (!!minutes) {
    if (!!hours) { content += `, ` }
    content += `${minutes} Minute${(minutes > 1 || minutes < -1) ? 's' : ''}`
  }

  return (
    <output className="RecipeForm__output">{content}</output>
  )
}

export function PrepTimeDisplay(props) {
  // Displays the prep time depending on its length:
  //'x Hours, x Minutes', 'x Hours', or 'x Minutes'.
  let content = '';
  let { className, prepend, hours, minutes } = props

  hours = parseInt(hours)
  minutes = parseInt(minutes)

  if (!hours && !minutes) {
    content = 'No prep time entered.'
  }
  if (!!hours) { content += `${hours} Hour${(hours > 1 || hours < -1) ? 's' : ''}` }
  if (!!minutes) {
    if (!!hours) { content += `, ` }
    content += `${minutes} Minute${(minutes > 1 || minutes < -1) ? 's' : ''}`
  }

  return (
  <span className={className}>{prepend}{content}</span>
  )
}



export function TextArea(props) {
  const { defaultValue, updateField, areaId, areaLabel, disabled } = props;
  const areaName = `RecipeForm__${areaId}`
  return (
    <>
      <label className='Input__label__description' htmlFor={areaId}>{areaLabel}</label>
      <textarea
        className={`TextArea ${areaName}`}
        defaultValue={defaultValue}
        id={areaId}
        onChange={e => updateField(areaId, e.target.value)}
        disabled={disabled}
      >
      </textarea>
    </>
  )
}


function Option(props) {
  //Sets option field for unit
  const { unit, selected } = props
  const unit_data = unit.unit_data,
    unit_set = unit.unit_set,
    unit_displayName = (unit_set === 'none') ? 'None' : unit_data.unit_plural.charAt(0).toUpperCase() + unit_data.unit_plural.slice(1);

  return (
    <option value={unit_set} selected={selected}>{unit_displayName}</option>
  )
}

export function OptGroup(props) {
  //Sets option group for unit class.
  const { group, name } = props;

  return (
    <optgroup label={name}>
      {group.map(unit =>
        <Option unit={unit} key={unit.id} />
      )}
    </optgroup>
  )
}