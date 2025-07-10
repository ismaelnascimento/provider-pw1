//faxineiros, pedreiros, pintores de paredes, bombeiros hidráulicos, eletricistas, marceneiros, cuidadores de idosos, entre outros prestadores de serviço autônomo, eventos, diversos

var categories = [
  {
    name: "Todos",
    icon: `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20.6666 8.66667C20.6666 11.244 18.5773 13.3333 15.9999 13.3333C13.4226 13.3333 11.3333 11.244 11.3333 8.66667C11.3333 6.08933 13.4226 4 15.9999 4C18.5773 4 20.6666 6.08933 20.6666 8.66667Z" stroke="#27272A" stroke-width="1.5"/>
<path d="M29.3333 23.3333C29.3333 25.9107 27.244 28 24.6667 28C22.0893 28 20 25.9107 20 23.3333C20 20.756 22.0893 18.6667 24.6667 18.6667C27.244 18.6667 29.3333 20.756 29.3333 23.3333Z" stroke="#27272A" stroke-width="1.5"/>
<path d="M12.0001 23.3333C12.0001 25.9107 9.91075 28 7.33341 28C4.75608 28 2.66675 25.9107 2.66675 23.3333C2.66675 20.756 4.75608 18.6667 7.33341 18.6667C9.91075 18.6667 12.0001 20.756 12.0001 23.3333Z" stroke="#27272A" stroke-width="1.5"/>
</svg>`,
  },
  {
    name: "Cabeleleiro",
    icon: `<svg
        width="42"
        height="42"
        viewBox="0 0 42 42"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_23_36)">
          <path
            d="M36.7696 25.4558C35.2075 27.0179 32.6748 27.018 31.1127 25.4558C29.5506 23.8937 29.5506 21.3611 31.1127 19.799C32.6748 18.2369 35.2074 18.2369 36.7696 19.799C38.3317 21.3611 38.3317 23.8938 36.7696 25.4558Z"
            stroke="#27272A"
            stroke-width="1.5"
          />
          <path
            d="M25.4558 36.7696C23.8937 38.3317 21.3611 38.3317 19.799 36.7696C18.2368 35.2074 18.2368 32.6748 19.799 31.1127C21.3611 29.5506 23.8937 29.5506 25.4558 31.1127C27.018 32.6748 27.018 35.2074 25.4558 36.7696Z"
            stroke="#27272A"
            stroke-width="1.5"
          />
          <path
            d="M29.2271 21.6846L7.54246 20.7418"
            stroke="#27272A"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M21.6849 29.2274L21.6846 21.6846"
            stroke="#27272A"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M20.7417 7.54257L21.2132 17.442"
            stroke="#27272A"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_23_36">
            <rect
              width="32"
              height="32"
              fill="white"
              transform="translate(22.6274) rotate(45)"
            />
          </clipPath>
        </defs>
      </svg>
    `,
  },
  {
    name: "Pedreiro",
    icon: `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M26.6667 29.3333V25.3333C26.6667 22.8192 26.6667 21.5621 25.8856 20.7811C25.1045 20 23.8475 20 21.3333 20H18.6667L16 22.6667L13.3333 20H10.6667C8.15252 20 6.89544 20 6.1144 20.7811C5.33334 21.5621 5.33334 22.8192 5.33334 25.3333V29.3333"
                          stroke="#27272A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M21.3333 20V29.3333" stroke="#27272A" stroke-width="1.5" stroke-linecap="round"
                          stroke-linejoin="round" />
                        <path d="M10.6667 20V29.3333" stroke="#27272A" stroke-width="1.5" stroke-linecap="round"
                          stroke-linejoin="round" />
                        <path
                          d="M20.6667 12V9.33334C20.6667 6.75601 18.5773 4.66667 16 4.66667C13.4227 4.66667 11.3333 6.75601 11.3333 9.33334V12C11.3333 14.5773 13.4227 16.6667 16 16.6667C18.5773 16.6667 20.6667 14.5773 20.6667 12Z"
                          stroke="#27272A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M10 10H22" stroke="#27272A" stroke-width="1.5" stroke-linecap="round"
                          stroke-linejoin="round" />
                        <path d="M16 2.66667V4.66667" stroke="#27272A" stroke-width="1.5" stroke-linecap="round"
                          stroke-linejoin="round" />
                      </svg>`,
  },
  {
    name: "Faxineiro",
    icon: `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M28 4L17.3333 15.3333" stroke="#27272A" stroke-width="1.5" stroke-linecap="round"
                            stroke-linejoin="round" />
                          <path
                            d="M12.5943 14.7805C9.28719 16.0491 6.64359 15.8315 4 14.7847C4.66745 23.3747 8.67219 26.6785 14.0119 28C14.0119 28 18.0348 25.1552 18.6147 18.4099C18.6775 17.6793 18.7089 17.3141 18.5571 16.9025C18.4051 16.4909 18.1069 16.1957 17.5105 15.6053C16.5297 14.6343 16.0393 14.1488 15.4572 14.0272C14.8752 13.9057 14.1149 14.1973 12.5943 14.7805Z"
                            stroke="#27272A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                          <path d="M6 21.9285C6 21.9285 9.33333 22.5715 12.6667 20" stroke="#27272A" stroke-width="1.5"
                            stroke-linecap="round" stroke-linejoin="round" />
                          <path
                            d="M11.3333 9.66667C11.3333 10.5871 10.5871 11.3333 9.66667 11.3333C8.74619 11.3333 8 10.5871 8 9.66667C8 8.74619 8.74619 8 9.66667 8C10.5871 8 11.3333 8.74619 11.3333 9.66667Z"
                            stroke="#27272A" stroke-width="1.5" />
                          <path d="M14.6667 5.33333V5.46666" stroke="#27272A" stroke-width="1.5" stroke-linecap="round"
                            stroke-linejoin="round" />
                        </svg>`,
  },
  {
    name: "Reparo",
    icon: `<svg width="32" height="32" viewBox="0 0 32 32" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.3333 14.6667L24 8" stroke="#27272A" stroke-width="1.5" />
                            <path d="M25.3334 9.33334L22.6667 6.66667L26 4.66667L27.3334 6.00001L25.3334 9.33334Z"
                              stroke="#27272A" stroke-width="1.5" stroke-linejoin="round" />
                            <path
                              d="M5.36684 11.9665C4.01888 10.6185 3.66793 8.65114 4.31397 6.98064L6.20997 8.87664H8.87664V6.20997L6.98064 4.31397C8.65114 3.66793 10.6185 4.01888 11.9665 5.36684C13.3149 6.71529 13.6657 8.68365 13.0186 10.3546L21.6455 18.9813C23.3164 18.3343 25.2847 18.6851 26.6332 20.0335C27.9811 21.3815 28.3321 23.3488 27.686 25.0193L25.79 23.1233H23.1233V25.79L25.0193 27.686C23.3488 28.3321 21.3815 27.9811 20.0335 26.6332C18.686 25.2857 18.3348 23.3193 18.9799 21.6492L10.3508 13.0201C8.6807 13.6652 6.71428 13.3139 5.36684 11.9665Z"
                              stroke="#27272A" stroke-width="1.5" stroke-linejoin="round" />
                            <path
                              d="M16.2707 19.3333L8.79864 26.8055C8.09488 27.5092 6.95388 27.5092 6.25012 26.8055L5.1945 25.7499C4.49075 25.0461 4.49075 23.9051 5.1945 23.2013L12.6666 15.7292"
                              stroke="#27272A" stroke-width="1.5" stroke-linejoin="round" />
                          </svg>`,
  },
];

module.exports = categories;
