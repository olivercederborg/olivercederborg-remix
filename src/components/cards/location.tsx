'use client'

import createGlobe from 'cobe'
import * as React from 'react'
import { Globe } from 'lucide-react'
import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'
import { useSpring } from 'react-spring'

import { defaultVariantsNoDelay } from '~/components/motion.variants'

export function LocationCard() {
  const { resolvedTheme } = useTheme()
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const pointerInteracting = React.useRef<number | null>(null)
  const pointerInteractionMovement = React.useRef(0)
  const fadeMask
      = 'radial-gradient(circle at 50% 50%, rgb(0, 0, 0) 60%, rgb(0, 0, 0, 0) 70%)'

  const [{ r }, api] = useSpring(() => ({
    r: 0,
    config: {
      mass: 0.5,
      tension: 200,
      friction: 20,
      precision: 0.001,
    },
  }))

  React.useEffect(() => {
    let width = 0
    let phi = 3
    let direction = 1

    const onResize = () => {
      if (canvasRef.current && (width = canvasRef.current.offsetWidth)) {
        window.addEventListener('resize', onResize)
      }
    }
    onResize()

    if (!canvasRef.current)
      return

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0.2,
      dark: resolvedTheme === 'dark' ? 1 : 0,
      diffuse: 3,
      mapSamples: 36_000,
      mapBrightness: 2.5,
      baseColor: resolvedTheme === 'dark' ? [0.5, 0.5, 0.5] : [1, 1, 1],
      markerColor: [1.5, 100 / 255, 100 / 255],
      glowColor:
            resolvedTheme === 'dark' ? [0.5, 0.5, 0.5] : [0.9, 0.9, 0.9],
      markers: [
        // copenhagen latitute and longitude
        { location: [55.6761, 12.5683], size: 0.4 },
      ],
      scale: 1,
      onRender: (state) => {
        state.phi = phi + r.get()

        if (state.phi > 5.5)
          direction = -1
        else if (state.phi < 3.25)
          direction = 1

        if (direction === 1) {
          phi += 0.001
        }
        else {
          phi -= 0.001
        }

        state.width = width * 2
        state.height = width * 2
      },
    })

    return () => {
      globe.destroy()
      window.removeEventListener('resize', onResize)
    }
  }, [r, resolvedTheme])

  return (
    <motion.div
      variants={defaultVariantsNoDelay}
      whileHover={{ scale: 1.05 }}
      className="card-border relative col-span-4 col-start-5 row-span-3 row-start-2 flex flex-col gap-6 overflow-hidden rounded-xl bg-white p-4 dark:bg-neutral-900 md:col-span-2 md:col-start-6 md:row-span-2 md:row-start-2 md:h-40"
    >
      <div className="z-10 flex items-center gap-2">
        <Globe className="size-[18px]" />
        <h2 className="text-sm font-light">Copenhagen</h2>
      </div>
      <div className="absolute inset-x-0 bottom-[-75%] mx-auto aspect-square h-[150%] translate-x-[-12.5%] [@media(max-width:420px)]:h-[320px]">
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            placeItems: 'center',
            placeContent: 'center',
            overflow: 'visible',
          }}
        >
          <div
            style={{
              width: '100%',
              aspectRatio: '1/1',
              WebkitMaskImage: fadeMask,
              maskImage: fadeMask,
            }}
          >
            <canvas
              ref={canvasRef}
              onPointerDown={(e) => {
                pointerInteracting.current
                           = e.clientX - pointerInteractionMovement.current
                canvasRef.current
                && (canvasRef.current.style.cursor = 'grabbing')
              }}
              onPointerUp={() => {
                pointerInteracting.current = null
                canvasRef.current
                && (canvasRef.current.style.cursor = 'grab')
              }}
              onPointerOut={() => {
                pointerInteracting.current = null
                canvasRef.current
                && (canvasRef.current.style.cursor = 'grab')
              }}
              onMouseMove={(e) => {
                if (pointerInteracting.current !== null) {
                  const delta = e.clientX - pointerInteracting.current
                  pointerInteractionMovement.current = delta
                  api.start({
                    r: delta / 200,
                  })
                }
              }}
              onTouchMove={(e) => {
                if (
                  pointerInteracting.current !== null
                  && e.touches[0]
                ) {
                  const delta
                              = e.touches[0].clientX - pointerInteracting.current
                  pointerInteractionMovement.current = delta
                  api.start({
                    r: delta / 100,
                  })
                }
              }}
              style={{
                width: '100%',
                height: '100%',
                contain: 'layout paint size',
                cursor: 'auto',
                userSelect: 'none',
              }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}
