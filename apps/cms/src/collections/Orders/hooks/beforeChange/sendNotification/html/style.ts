const style = `
<style>
  /* Tailwind components that are generated by plugins */
/**
* @import here any custom components - classes that you'd want loaded
* before the Tailwind utilities, so that the utilities could still
* override them.
*/
.button {
display: inline-block;
color: #fff;
text-decoration-line: none;
background-color: #3869D4;
border-top: 10px solid #3869D4;
border-right: 18px solid #3869D4;
border-bottom: 10px solid #3869D4;
border-left: 18px solid #3869D4;
border-radius: 3px;
box-shadow: 0 2px 3px rgba(0, 0, 0, 0.16);
}
.button--green {
background-color: #22BC66;
border-top: 10px solid #22BC66;
border-right: 18px solid #22BC66;
border-bottom: 10px solid #22BC66;
border-left: 18px solid #22BC66;
}
.button--red {
background-color: #FF6136;
border-top: 10px solid #FF6136;
border-right: 18px solid #FF6136;
border-bottom: 10px solid #FF6136;
border-left: 18px solid #FF6136;
}
@media (max-width: 600px) {
.button {
  display: block !important;
  text-align: center !important;
}
}
.purchase_heading {
border-bottom-width: 1px;
border-bottom-color: #EAEAEC;
border-bottom-style: solid;
}
.purchase_heading p {
margin: 0;
font-size: 12px;
line-height: 24px;
color: #85878E;
}
.purchase_footer {
padding-top: 16px;
vertical-align: middle;
font-size: 16px;
border-top-width: 1px;
border-top-color: #EAEAEC;
border-top-style: solid;
}
.body-sub {
margin-top: 25px;
border-top-width: 1px;
padding-top: 25px;
border-top-color: #EAEAEC;
border-top-style: solid;
}
.discount {
width: 100%;
background-color: #F4F4F7;
padding: 96px;
border: 2px dashed #cbcccf;
}
@media (prefers-color-scheme: dark) {
body,
.email-body,
.email-body_inner,
.email-content,
.email-wrapper,
.email-masthead,
.email-footer {
  background-color: #333333 !important;
  color: #fff !important;
}

p,
ul,
ol,
blockquote,
h1,
h2,
h3 {
  color: #fff !important;
}

.attributes_content,
.discount {
  background-color: #222222 !important;
}

.email-masthead_name {
  text-shadow: none !important;
}
}
/* Tailwind utility classes */
.m-0 {
margin: 0;
}
.mx-auto {
margin-left: auto;
margin-right: auto;
}
.my-7 {
margin-top: 28px;
margin-bottom: 28px;
}
.my-7\.5 {
margin-top: 30px;
margin-bottom: 30px;
}
.mb-5 {
margin-bottom: 20px;
}
.mb-\[21px\] {
margin-bottom: 21px;
}
.mb-\[5px\] {
margin-bottom: 5px;
}
.mt-0 {
margin-top: 0;
}
.mt-1 {
margin-top: 4px;
}
.mt-1\.5 {
margin-top: 6px;
}
.block {
display: block;
}
.table {
display: table;
}
.hidden {
display: none;
}
.w-1\/5 {
width: 20%;
}
.w-4\/5 {
width: 80%;
}
.w-\[570px\] {
width: 570px;
}
.w-full {
width: 100%;
}
.bg-gray-postmark-lighter {
background-color: #F2F4F6;
}
.bg-gray-postmark-lightest {
background-color: #F4F4F7;
}
.bg-white {
background-color: #fff;
}
.p-0 {
padding: 0;
}
.p-4 {
padding: 16px;
}
.p-\[45px\] {
padding: 45px;
}
.py-2 {
padding-top: 8px;
padding-bottom: 8px;
}
.py-2\.5 {
padding-top: 10px;
padding-bottom: 10px;
}
.py-\[25px\] {
padding-top: 25px;
padding-bottom: 25px;
}
.py-\[35px\] {
padding-top: 35px;
padding-bottom: 35px;
}
.pb-2 {
padding-bottom: 8px;
}
.pb-4 {
padding-bottom: 16px;
}
.pr-4 {
padding-right: 16px;
}
.pt-\[25px\] {
padding-top: 25px;
}
.text-left {
text-align: left;
}
.text-center {
text-align: center;
}
.text-right {
text-align: right;
}
.font-sans {
font-family: "Nunito Sans", ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
}
.text-2xl {
font-size: 24px;
}
.text-base {
font-size: 16px;
}
.text-sm {
font-size: 14px;
}
.text-xs {
font-size: 12px;
}
.font-bold {
font-weight: 700;
}
.leading-4 {
line-height: 16px;
}
.leading-4\.5 {
line-height: 18px;
}
.leading-6 {
line-height: 24px;
}
.text-blue-postmark {
color: #3869D4;
}
.text-gray-postmark-dark {
color: #51545E;
}
.text-gray-postmark-darker {
color: #333333;
}
.text-gray-postmark-light {
color: #A8AAAF;
}
.text-gray-postmark-meta {
color: #85878E;
}
.\[-webkit-font-smoothing\:antialiased\] {
-webkit-font-smoothing: antialiased;
}
.\[text-decoration\:none\] {
text-decoration: none;
}
.\[text-shadow\:0_1px_0_\#FFF\] {
text-shadow: 0 1px 0 #FFF;
}
.\[word-break\:break-word\] {
word-break: break-word;
}
/* Your custom utility classes */

:root {
color-scheme: light dark;
}
@media (max-width: 600px) {
.sm\:w-full {
  width: 100% !important;
}
}

</style>
`

export default style
