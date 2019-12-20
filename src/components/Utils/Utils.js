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

//TODO put me in utils!
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

export function PrepTimeDisplay(props) {
  // Displays the prep time depending on its length:
  //'x Hours, x Minutes', 'x Hours', or 'x Minutes'.
  let content = '';
  const { hours, minutes } = props

  if (!hours && !minutes) {
    content = 'No prep time entered.'
  }
  if (hours) { content += `${hours} Hours` }
  if (minutes) {
    if (hours) { content += `, ` }
    content += `${minutes} Minutes`
  }

  return (
    <p className="RecipeForm__PrepTimeDisplay">{content}</p>
  )
}

export function Input(props) {
  const { defaultValue, updateField, inputId, inputLabel, inputType, required, max, disabled } = props;
  const inputName = `RecipesForm__${inputId}`;

  return (
    <>
      <label htmlFor={inputName} className='RecipesForm__TextInput'>{inputLabel}</label>
      <input
        type={inputType}
        max={max ? max : null}
        required={required ? true : false}
        name={inputName}
        id={inputId}
        defaultValue={defaultValue}
        onChange={event => updateField(inputId, event.target.value)}
        disabled={disabled}
      />
    </>
  )
}

export function TextArea(props) {
  const { defaultValue, updateField, areaId, areaLabel, disabled } = props;
  const areaName = `RecipesForm__${areaId}`
  return (
    <>
      <label htmlFor={areaName}>{areaLabel}</label>
      <textarea
        className='RecipesForm__TextArea'
        defaultValue={defaultValue}
        id={areaId}
        onChange={e => updateField(areaId, e.target.value)}
        disabled={disabled}
      >
      </textarea>
    </>
  )
}

export function BasicInfoFieldset(props) {
  //These fieldset utils set up fieldsets as needed for the add/edit recipe forms.
  const { updateRecipeField, nameDefault, authorDefault, servingsDefault, disabled } = props;

  return (
    <fieldset
      className='RecipesForm__basic-info'
      disabled={disabled}>
      <legend>Basic Info</legend>
      <Input
        updateField={updateRecipeField}
        defaultValue={nameDefault}
        inputId='name'
        inputName='name'
        inputType='text'
        inputLabel='Recipe Name'
      />
      <Input
        updateField={updateRecipeField}
        defaultValue={authorDefault}
        inputId='author'
        inputName='author'
        inputType='text'
        inputLabel='Author'
      />
      <Input
        updateField={updateRecipeField}
        defaultValue={servingsDefault}
        inputId='servings'
        inputName='servings'
        inputType='number'
        inputLabel='Servings'
      />
    </fieldset>
  )
}

export function PrepTimeFieldset(props) {
  const { updateRecipeField, hoursDefault, minutesDefault, disabled } = props;
  return (
    <fieldset
      className='RecipesForm__prep-time'
      disabled={disabled}>
      <legend>Prep Time</legend>
      <PrepTimeDisplay hours={hoursDefault} minutes={minutesDefault} />
      <Input
        updateField={updateRecipeField}
        defaultValue={!hoursDefault ? null : hoursDefault}
        inputId='prep_time_hours'
        inputLabel='Hours'
        inputType='number'
        max='59'
      />
      <Input
        updateField={updateRecipeField}
        defaultValue={!minutesDefault ? null : minutesDefault}
        inputId='prep_time_minutes'
        inputLabel='Minutes'
        inputType='number'
        max='59'
      />
    </fieldset>
  )
}

function Option(props) {
  //Sets option field for unit
  const { unit } = props
  const unit_data = unit.unit_data,
    unit_set = unit.unit_set,
    unit_displayName = (unit_set === 'none') ? 'None' : unit_data.unit_plural.charAt(0).toUpperCase() + unit_data.unit_plural.slice(1);

  return (
    <option value={unit_set}>{unit_displayName}</option>
  )
}

export function OptGroup(props) {
  //Sets option group for unit class.
  const { group, name } = props;

  return (
    <optgroup label={name}>
      {group.map(unit => <Option unit={unit} key={unit.id} />)}
    </optgroup>
  )
}