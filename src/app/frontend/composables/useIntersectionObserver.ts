type IntersectionObserverVars = {
  intersectionObserver: IntersectionObserver | undefined
}

export const useIntersectionObserver = () => {
  const intersectionObserverVars = useState<IntersectionObserverVars>('intersectionObserverVars', () => ({
    intersectionObserver: undefined,
  }))

  const observeIntersectionObserver = () => {
    if (!intersectionObserverVars.value.intersectionObserver) {
      return
    }

    const targets = document.querySelectorAll('.IntersectionObserver:not(.IntersectionObserver--ready)')

    for (let i = 0, iLength = targets.length; i < iLength; i = i + 1) {
      const target = targets[i]

      target.classList.add('IntersectionObserver--ready')

      intersectionObserverVars.value.intersectionObserver.observe(target)
    }
  }

  return {
    intersectionObserverVars,
    initIntersectionObserver: () => {
      if (!intersectionObserverVars.value.intersectionObserver) {
        intersectionObserverVars.value.intersectionObserver = new IntersectionObserver(
          (items) => {
            Array.prototype.forEach.call(items, (item) => {
              const { isIntersecting, target } = item
              const delay = target.getAttribute('data-intersection-observer-delay')

              // 遅延開始が指定されている場合
              if (isIntersecting && delay) {
                if (
                  intersectionObserverVars.value.intersectionObserver &&
                  target.classList.contains('IntersectionObserver--once')
                ) {
                  intersectionObserverVars.value.intersectionObserver.unobserve(target)
                }

                ;(function (elm, i) {
                  setTimeout(function () {
                    elm.classList.add('IntersectionObserver--active')
                  }, i)
                })(target, delay)
              } else if (isIntersecting) {
                if (
                  intersectionObserverVars.value.intersectionObserver &&
                  target.classList.contains('IntersectionObserver--once')
                ) {
                  intersectionObserverVars.value.intersectionObserver.unobserve(target)
                }

                target.classList.add('IntersectionObserver--active')
              } else {
                target.classList.remove('IntersectionObserver--active')
              }
            })
          },
          {
            rootMargin: '-10% 0px',
          }
        )
      }

      observeIntersectionObserver()
    },
    observeIntersectionObserver,
    disconnectInitIntersectionObserver: () => {
      if (!intersectionObserverVars.value.intersectionObserver) {
        return
      }

      intersectionObserverVars.value.intersectionObserver.disconnect()
    },
  }
}
