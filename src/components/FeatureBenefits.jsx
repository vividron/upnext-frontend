import { CircleCheck } from "lucide-react";

const FeatureBenefits = ({ benefits }) => {
    return (
        <ul className="flex flex-col gap-2.5">
            {benefits.map((benefit, index) => (
                <li key={index}
                    className="flex gap-3 items-center font-medium"
                >
                    <CircleCheck className="size-5 text-primary" />
                    <span className="text-main opacity-90">{benefit}</span>
                </li>
            ))}
        </ul>
    );
}

export default FeatureBenefits;