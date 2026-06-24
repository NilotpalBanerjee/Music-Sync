import { useEffect } from "react";
import { Input, Button, Typography, Space } from "antd";
import { ReloadOutlined } from "@ant-design/icons";

const { Text } = Typography;

export default function CaptchaBox({ captcha, setCaptcha, refreshKey }) {
    const generateCaptcha = () => {
        const ops = ["+", "-", "*"];
        let a = Math.floor(Math.random() * 10);
        let b = Math.floor(Math.random() * 10);
        const op = ops[Math.floor(Math.random() * ops.length)];

        if (op === "-" && a < b) [a, b] = [b, a];

        const answer =
            op === "+" ? a + b : op === "-" ? a - b : a * b;

        setCaptcha({
            question: `${a} ${op} ${b} = ?`,
            answer,
            userInput: "",
        });
    };

    useEffect(() => {
        generateCaptcha();
    }, [refreshKey]);

    return (
        <div className="mb-6">
            <Text className="uppercase text-xs text-gray-500">Captcha</Text>
            <div className="mt-2 flex items-center gap-3">
                <div
                    className="flex items-center justify-center rounded-md border border-gray-300 bg-white"
                    style={{
                        width: 170,
                        height: 40,
                        fontSize: 18,
                        fontWeight: 500,
                        letterSpacing: 1,
                    }}
                >
                    {captcha.question}
                </div>
                <Button
                    icon={<ReloadOutlined />}
                    onClick={generateCaptcha}
                    style={{
                        height: 40,
                        width: 40,
                        borderRadius: 8,
                    }}
                />
                <Input
                    placeholder="Answer"
                    value={captcha.userInput}
                    maxLength={3}
                    inputMode="numeric"
                    style={{
                        width: 170,
                        height: 40,
                    }}
                    onChange={(e) =>
                        setCaptcha({
                            ...captcha,
                            userInput: e.target.value.replace(/\D/g, ""),
                        })
                    }
                />
            </div>
        </div>
    );
}
