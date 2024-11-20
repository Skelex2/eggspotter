document.addEventListener('DOMContentLoaded', function() {
    const leftAd = document.querySelector('.left-ad');
    const rightAd = document.querySelector('.right-ad');

    if (leftAd && rightAd) {
        leftAd.innerHTML = `
            <ins class="adsbygoogle"
                 style="display:block"
                 data-ad-client="ca-pub-4744102896947046"
                 data-ad-slot="XXXXXXXXXX"
                 data-ad-format="auto"></ins>
            <script>
                 (adsbygoogle = window.adsbygoogle || []).push({});
            </script>
        `;

        rightAd.innerHTML = `
            <ins class="adsbygoogle"
                 style="display:block"
                 data-ad-client="ca-pub-4744102896947046"
                 data-ad-slot="XXXXXXXXXX"
                 data-ad-format="auto"></ins>
            <script>
                 (adsbygoogle = window.adsbygoogle || []).push({});
            </script>
        `;
    }
});
