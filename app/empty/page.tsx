import Button from "../components/Button"

export default function emptyState() {
   return (
      <div className="flex items-center justify-center mt-14  ">
            <div className="w-[590px] h-[150px] flex flex-col items-center ">
                <h6 className="text-3xl sm:text-5xl font-medium mb-6 text-center sm:w-full w-14 text-yellow-50">
                    Your movie list is empty
                </h6>
                <Button
                    className="text-sm text-yellow-50 font-bold mt-3 sm:h-[56px] w-[350px] sm:w-[200px]"
                    text="Add a new movie"
                    type="button"
                />
            </div>
        </div>
   )
}