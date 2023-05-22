import { IShowNotificationOptions, NotificationProviderKey } from '~/components/notification/types'

export default function () {
  const notificationHelperInjection = inject(NotificationProviderKey, null)

  const showNotification = (text: string, options?: IShowNotificationOptions) => {
    if (!notificationHelperInjection) {
      throw Error('Not found notificationHelperInjection')
    }

    return notificationHelperInjection.show(text, options)
  }

  return {
    showNotification,
  }
}
