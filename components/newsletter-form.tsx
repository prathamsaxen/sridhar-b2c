'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  newsletterSubscribeSchema,
  type NewsletterSubscribeInput,
  normalizeNewsletterEmail,
} from '@/lib/validators/newsletter'

export function NewsletterForm() {
  const [status, setStatus] = useState<{
    type: 'success' | 'info' | 'error'
    text: string
  } | null>(null)

  const form = useForm<NewsletterSubscribeInput>({
    resolver: zodResolver(newsletterSubscribeSchema),
    defaultValues: { email: '' },
    mode: 'onBlur',
  })

  async function onSubmit(values: NewsletterSubscribeInput) {
    setStatus(null)
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: normalizeNewsletterEmail(values.email),
        }),
      })

      const data = (await res.json()) as {
        ok?: boolean
        message?: string
        error?: string
        code?: string
      }

      if (res.status === 409 && data.message) {
        setStatus({ type: 'info', text: data.message })
        return
      }

      if (!res.ok) {
        setStatus({
          type: 'error',
          text: data.error ?? 'Something went wrong. Please try again.',
        })
        return
      }

      setStatus({
        type: 'success',
        text: data.message ?? 'Thanks for subscribing to our newsletter.',
      })
      form.reset()
    } catch {
      setStatus({
        type: 'error',
        text: 'Network error. Please try again.',
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="sr-only">Email address</FormLabel>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-stretch sm:gap-2">
                <FormControl>
                  <Input
                    type="email"
                    autoComplete="email"
                    placeholder="Enter your email"
                    disabled={form.formState.isSubmitting}
                    className="h-9 w-full min-w-0 bg-background text-foreground border-border placeholder:text-muted-foreground"
                    {...field}
                  />
                </FormControl>
                <Button
                  type="submit"
                  className="h-9 w-full shrink-0 px-4 sm:w-auto sm:min-w-30"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? 'Subscribing…' : 'Subscribe'}
                </Button>
              </div>
              <FormMessage className="text-xs text-red-300" />
            </FormItem>
          )}
        />
        {status && (
          <p
            role="status"
            className={
              status.type === 'success'
                ? 'text-sm text-emerald-300'
                : status.type === 'info'
                  ? 'text-sm text-amber-200'
                  : 'text-sm text-red-300'
            }
          >
            {status.text}
          </p>
        )}
      </form>
    </Form>
  )
}
