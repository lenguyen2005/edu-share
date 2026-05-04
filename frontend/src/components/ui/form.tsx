"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import {
  Controller,
  FormProvider,
  useFormContext,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form"

export const Form = FormProvider

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName
}

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
)

type FormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = ControllerProps<TFieldValues, TName>

export function FormField<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
>(props: FormFieldProps<TFieldValues, TName>) {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  )
}

export function FormItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("space-y-2", className)}>{children}</div>;
}

export function FormLabel({
  children,
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label className="text-sm font-medium" {...props}>
      {children}
    </label>
  )
}

export function FormControl({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>
}

export function FormMessage() {
  const { formState, getFieldState } = useFormContext()
  const fieldContext = React.useContext(FormFieldContext)
  
  const fieldState = getFieldState(fieldContext.name, formState)
  const error = fieldState.error

  if (!error) return null

  return (
    <p className="text-sm text-red-500 mt-1">
      {error.message?.toString() ?? "Trường này không hợp lệ"}
    </p>
  )
}