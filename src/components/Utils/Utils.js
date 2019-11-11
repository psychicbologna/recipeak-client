import React from 'react';
import { format as formatDate } from 'date-fns';

export function FullName({ user }) {
  return `${user.first_name} ${user.last_name}`;
}

export function NiceDate({ date, format = 'Do MMMM YYYY' }) {
  return formatDate(date, format)
}

export function Hyph() {
  return <span className='Hyph'>{' - '}</span>
}

export function Button({ className, ...props }) {
  return <button className={['Button', className].join(' ')} {...props} />
}

export function Textarea({ className, ...props }) {
  return (
    <textarea className={['Textarea', className].join(' ')} {...props} />
  )
}

export function Input({ className, ...props }) {
  return (
    <input className={['Input', className].join(' ')} {...props} />
  )
}

export function Required({ className, ...props }) {
  return (
    <span className={['Required', className].join(' ')} {...props}>
      &#42;
    </span>
  )
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

//Selects proper display unit based on unit properties.
export function chooseDisplayUnit(ingredient, units) {
  let displayUnit;

  if (ingredient.unit_set === 'Custom') {
    displayUnit = ingredient.unit_data;
  } else {

    const unitSet = ingredient.unit_set;
    const unitsFiltered = units.filter(unit => unit.unit_set === unitSet);

    if (!unitsFiltered || !unitsFiltered.length) {
      displayUnit = { unit_singular: null, unit_plural: null }
    } else {
      displayUnit = unitsFiltered[0].unit_data;
    }
  }

  if (ingredient.amount == 1) {
    return displayUnit.unit_single
  }
  else { return displayUnit.unit_plural };
}