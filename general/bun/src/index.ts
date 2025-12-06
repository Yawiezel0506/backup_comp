console.log("Hello via Bun!");

enum ConditionType {
    OR = 'or',
    AND = 'and',
}

enum CategoricRange {
    BLOCK = 'נחסם',
    UNBLOCK = 'לא נחסם'
}

interface NumericRange {
    min: string;
    max: string;
}

interface MashmautCondition {
    frequency: string
    condition: NumericRange | CategoricRange
}

interface MashmautRange {
    label: string
    color: string
    conditionType: ConditionType | undefined
    conditions: MashmautCondition[];
}

//on client

const createPlayground = trpc.playground.createPlayground.useMutation()

createPlayground.mutate({
    someParamsInput
},
{
    onSuccess: ()=> someActions
})

//on backend

createPlayground: publicProducer.input().mutation(async (input)=> {
    try {
        const a = await  mainClient.mutate({
            mutation: someMutation,
            variables:variables
        })

        await createSomthingBaseOnTheRequest
    } catch (error) {
        
    }
} )