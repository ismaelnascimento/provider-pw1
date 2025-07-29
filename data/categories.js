//pintores de paredes, bombeiros hidráulicos, eletricistas, marceneiros, cuidadores de idosos, outros prestadores de serviço autônomo, eventos, diversos

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
  {
    name: "Pintor de parede",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
      <path d="M4 5C4 4.25579 4 3.88369 4.08912 3.58019C4.30005 2.86183 4.86183 2.30005 5.58019 2.08912C5.88369 2 6.25579 2 7 2H14C14.7442 2 15.1163 2 15.4198 2.08912C16.1382 2.30005 16.7 2.86183 16.9109 3.58019C17 3.88369 17 4.25579 17 5C17 5.74421 17 6.11631 16.9109 6.41981C16.7 7.13817 16.1382 7.69995 15.4198 7.91088C15.1163 8 14.7442 8 14 8H7C6.25579 8 5.88369 8 5.58019 7.91088C4.86183 7.69995 4.30005 7.13817 4.08912 6.41981C4 6.11631 4 5.74421 4 5Z" stroke="#141B34" stroke-width="1.5" stroke-linecap="round" />
    <path d="M12 17.5C12 17.0341 12 16.8011 12.0761 16.6173C12.1776 16.3723 12.3723 16.1776 12.6173 16.0761C12.8011 16 13.0341 16 13.5 16C13.9659 16 14.1989 16 14.3827 16.0761C14.6277 16.1776 14.8224 16.3723 14.9239 16.6173C15 16.8011 15 17.0341 15 17.5V20.5C15 20.9659 15 21.1989 14.9239 21.3827C14.8224 21.6277 14.6277 21.8224 14.3827 21.9239C14.1989 22 13.9659 22 13.5 22C13.0341 22 12.8011 22 12.6173 21.9239C12.3723 21.8224 12.1776 21.6277 12.0761 21.3827C12 21.1989 12 20.9659 12 20.5V17.5Z" stroke="#141B34" stroke-width="1.5" stroke-linecap="round" />
    <path d="M17.249 5C18.1037 5 18.531 5 18.8681 5.15224C19.9978 5.6624 20.0005 6.86278 20.0005 8.00422C20.0005 8.96065 20.0005 9.43886 19.8701 9.84219C19.4513 11.1378 17.7387 11.768 16.0836 12.2373C14.9006 12.5727 14.3091 12.7404 13.9045 13.2756C13.5 13.8107 13.5 14.4389 13.5 15.6952V16" stroke="#141B34" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>`,
  },
  {
    name: "Eletricista",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
    <path d="M20 8.58505V13.5005C20 17.2717 20 19.1574 18.8284 20.3289C18.0203 21.1371 16.8723 21.3878 15 21.4655M4 8.58505V13.5005C4 17.2717 4 19.1574 5.17157 20.3289C6.23465 21.392 7.88563 21.4905 10.9998 21.4996C11.5521 21.5012 12 21.0528 12 20.5005V17.5005" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
    <path d="M22 10.5003L17.6569 6.33582C14.9902 3.77883 13.6569 2.50034 12 2.50034C10.3431 2.50034 9.00981 3.77883 6.34315 6.33582L2 10.5003" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path>
    <path d="M14.001 9.00034V11.5003M10.001 11.5003V9.00034M8.50553 12.3803C8.46629 11.9054 8.87602 11.5003 9.39552 11.5003H14.6104C15.1299 11.5003 15.5396 11.9054 15.5004 12.3803L15.3931 13.6777C15.316 14.6104 14.9786 15.5093 14.4133 16.2879L14.0628 16.7706C13.7319 17.2264 13.1741 17.5003 12.5768 17.5003H11.4291C10.8318 17.5003 10.2741 17.2264 9.94308 16.7706L9.59262 16.2879C9.02726 15.5093 8.68984 14.6104 8.61276 13.6777L8.50553 12.3803Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path>
</svg>`,
  },
  {
    name: "Marceneiro",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
    <path d="M15.5 12C15.5 13.933 13.933 15.5 12 15.5C10.067 15.5 8.5 13.933 8.5 12C8.5 10.067 10.067 8.5 12 8.5C13.933 8.5 15.5 10.067 15.5 12Z" stroke="#141B34" stroke-width="1.5" />
    <path d="M21.011 14.0965C21.5329 13.9558 21.7939 13.8854 21.8969 13.7508C22 13.6163 22 13.3998 22 12.9669V11.0332C22 10.6003 22 10.3838 21.8969 10.2493C21.7938 10.1147 21.5329 10.0443 21.011 9.90358C19.0606 9.37759 17.8399 7.33851 18.3433 5.40087C18.4817 4.86799 18.5509 4.60156 18.4848 4.44529C18.4187 4.28902 18.2291 4.18134 17.8497 3.96596L16.125 2.98673C15.7528 2.77539 15.5667 2.66972 15.3997 2.69222C15.2326 2.71472 15.0442 2.90273 14.6672 3.27873C13.208 4.73448 10.7936 4.73442 9.33434 3.27864C8.95743 2.90263 8.76898 2.71463 8.60193 2.69212C8.43489 2.66962 8.24877 2.77529 7.87653 2.98663L6.15184 3.96587C5.77253 4.18123 5.58287 4.28891 5.51678 4.44515C5.45068 4.6014 5.51987 4.86787 5.65825 5.4008C6.16137 7.3385 4.93972 9.37763 2.98902 9.9036C2.46712 10.0443 2.20617 10.1147 2.10308 10.2492C2 10.3838 2 10.6003 2 11.0332V12.9669C2 13.3998 2 13.6163 2.10308 13.7508C2.20615 13.8854 2.46711 13.9558 2.98902 14.0965C4.9394 14.6225 6.16008 16.6616 5.65672 18.5992C5.51829 19.1321 5.44907 19.3985 5.51516 19.5548C5.58126 19.7111 5.77092 19.8188 6.15025 20.0341L7.87495 21.0134C8.24721 21.2247 8.43334 21.3304 8.6004 21.3079C8.76746 21.2854 8.95588 21.0973 9.33271 20.7213C10.7927 19.2644 13.2088 19.2643 14.6689 20.7212C15.0457 21.0973 15.2341 21.2853 15.4012 21.3078C15.5682 21.3303 15.7544 21.2246 16.1266 21.0133L17.8513 20.034C18.2307 19.8187 18.4204 19.711 18.4864 19.5547C18.5525 19.3984 18.4833 19.132 18.3448 18.5991C17.8412 16.6616 19.0609 14.6226 21.011 14.0965Z" stroke="#141B34" stroke-width="1.5" stroke-linecap="round" />
</svg>`,
  },
  {
    name: "Cuidador",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
    <path d="M14 8.5C14 5.73858 11.7614 3.5 9 3.5C6.23858 3.5 4 5.73858 4 8.5C4 11.2614 6.23858 13.5 9 13.5C11.7614 13.5 14 11.2614 14 8.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
    <path d="M16 20.5C16 16.634 12.866 13.5 9 13.5C5.13401 13.5 2 16.634 2 20.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
    <path d="M19 14.5C19 14.5 22 13.1765 22 11.0278C22 10.184 21.3684 9.5 20.5 9.5C19.7895 9.5 19.3158 9.79412 19 10.3824C18.6842 9.79412 18.2105 9.5 17.5 9.5C16.6316 9.5 16 10.184 16 11.0278C16 13.1765 19 14.5 19 14.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>`,
  },
  {
    name: "Eventos",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
    <path d="M16 2V6M8 2V6" stroke="#141B34" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M13 4H11C7.22876 4 5.34315 4 4.17157 5.17157C3 6.34315 3 8.22876 3 12V14C3 17.7712 3 19.6569 4.17157 20.8284C5.34315 22 7.22876 22 11 22H13C16.7712 22 18.6569 22 19.8284 20.8284C21 19.6569 21 17.7712 21 14V12C21 8.22876 21 6.34315 19.8284 5.17157C18.6569 4 16.7712 4 13 4Z" stroke="#141B34" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M3 10H21" stroke="#141B34" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M11.9955 14H12.0045M11.9955 18H12.0045M15.991 14H16M8 14H8.00897M8 18H8.00897" stroke="#141B34" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
</svg>`,
  },
  {
    name: "Diversos",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
    <path d="M11.9959 18H12.0049" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
    <path d="M17.9998 18H18.0088" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
    <path d="M5.99981 18H6.00879" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
    <path d="M11.9959 12H12.0049" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
    <path d="M11.9998 6H12.0088" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
    <path d="M17.9998 12H18.0088" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
    <path d="M17.9998 6H18.0088" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
    <path d="M5.99981 12H6.00879" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
    <path d="M5.99981 6H6.00879" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>`,
  },

];

module.exports = categories;
