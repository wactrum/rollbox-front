import { NotificationProviderKey } from '~/components/notification/types'

export default function () {
  const notificationHelperInjection = inject(NotificationProviderKey, null)

  const showNotification = (text: string) => {
    if (!notificationHelperInjection) {
      throw Error('Not found notificationHelperInjection')
    }

    return notificationHelperInjection.show(text)
  }

  return {
    showNotification,
  }
}
