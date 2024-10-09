import { Character } from "@/app/lib/definitions";
import Image from "next/image";
// @ts-expect-error: canvas confetti doesnt come with types
import confetti from 'canvas-confetti';


export default function Winner({character, guesses, resetGame, reRollCharacter}:{character: Character | undefined, guesses: number, resetGame: () => void, reRollCharacter: () => void}){
    
    const count = 200;
    const defaults = {
    origin: { y: 0.7 }
    };

    function fire(particleRatio: number, opts: object) {
    confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
    });
    }

    fire(0.25, {
    spread: 26,
    startVelocity: 55,
    });
    fire(0.2, {
    spread: 60,
    });
    fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8
    });
    fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2
    });
    fire(0.1, {
    spread: 120,
    startVelocity: 45,
    });
    
    return (
        <div className="flex justify-center items-center backdrop-blur-3xl backdrop-opacity-50">
            <div className="border-[4px] border-[#584c44] bg-[#fffcf4] text-[#584c44] p-10 rounded-2xl flex flex-col gap-10 items-center justify-center h-[75vh] w-[50vw]">
                <Image
                    src={"/assets"+character?.imageurl}
                    width={500}
                    height={500}
                    alt="image"
                    className="rounded-2xl"
                />
                <div className="text-center">
                    <h1 className="font-bold text-xl">Correct! It is {character?.name}</h1>
                    <h2>You guessed correctly in {guesses} attempts!</h2>
                    <button onClick={async () => {
                        resetGame()
                        await reRollCharacter()
                    }}>
                        Try again?
                    </button>
                </div>
            </div>
        </div>
    )
}