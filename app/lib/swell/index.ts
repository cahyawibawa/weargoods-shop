import swell from "swell-js";

const options: swell.InitOptions = {};

swell.init(
	// rome-ignore lint/style/noNonNullAssertion: <explanation>
	process.env.NEXT_PUBLIC_SWELL_STORE_ID!,
	// rome-ignore lint/style/noNonNullAssertion: <explanation>
	process.env.NEXT_PUBLIC_SWELL_PUBLIC_KEY!,
	options,
);

export default swell;
